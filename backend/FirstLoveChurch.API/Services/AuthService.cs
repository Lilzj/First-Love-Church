using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using FirstLoveChurch.API.DTOs.Auth;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace FirstLoveChurch.API.Services;

public class AuthService : IAuthService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        UserManager<ApplicationUser> userManager,
        RoleManager<ApplicationRole> roleManager,
        IConfiguration configuration,
        IMapper mapper,
        IEmailService emailService,
        ILogger<AuthService> logger)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _mapper = mapper;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<ApiResponse<LoginResponseDto>> RegisterAsync(RegisterDto dto)
    {
        var existingUser = await _userManager.FindByEmailAsync(dto.Email);
        if (existingUser != null)
            return ApiResponse<LoginResponseDto>.FailResponse("A user with this email already exists");

        var user = _mapper.Map<ApplicationUser>(dto);
        user.UserName = dto.Email;

        var result = await _userManager.CreateAsync(user, dto.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            return ApiResponse<LoginResponseDto>.FailResponse(errors, "Registration failed");
        }

        // Assign default Member role
        await _userManager.AddToRoleAsync(user, "Member");

        // Send verification email
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        await _emailService.SendVerificationEmailAsync(user.Email!, token);

        // Generate tokens
        var loginResponse = await GenerateLoginResponse(user);

        _logger.LogInformation("New user registered: {Email}", dto.Email);
        return ApiResponse<LoginResponseDto>.SuccessResponse(loginResponse, "Registration successful. Please verify your email.", 201);
    }

    public async Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null || user.IsDeleted)
            return ApiResponse<LoginResponseDto>.FailResponse("Invalid email or password", 401);

        if (!user.IsActive)
            return ApiResponse<LoginResponseDto>.FailResponse("Your account has been deactivated", 403);

        var isPasswordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!isPasswordValid)
            return ApiResponse<LoginResponseDto>.FailResponse("Invalid email or password", 401);

        var loginResponse = await GenerateLoginResponse(user);

        _logger.LogInformation("User logged in: {Email}", dto.Email);
        return ApiResponse<LoginResponseDto>.SuccessResponse(loginResponse, "Login successful");
    }

    public async Task<ApiResponse<LoginResponseDto>> RefreshTokenAsync(RefreshTokenDto dto)
    {
        var principal = GetPrincipalFromExpiredToken(dto.Token);
        if (principal == null)
            return ApiResponse<LoginResponseDto>.FailResponse("Invalid token", 401);

        var userId = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            return ApiResponse<LoginResponseDto>.FailResponse("Invalid token", 401);

        var user = await _userManager.FindByIdAsync(userId);
        if (user == null || user.RefreshToken != dto.RefreshToken ||
            user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            return ApiResponse<LoginResponseDto>.FailResponse("Invalid or expired refresh token", 401);

        var loginResponse = await GenerateLoginResponse(user);
        return ApiResponse<LoginResponseDto>.SuccessResponse(loginResponse, "Token refreshed successfully");
    }

    public async Task<ApiResponse> ForgotPasswordAsync(ForgotPasswordDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            return ApiResponse.SuccessResponse("If an account exists with this email, a reset link has been sent");

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        await _emailService.SendPasswordResetEmailAsync(dto.Email, token);

        return ApiResponse.SuccessResponse("If an account exists with this email, a reset link has been sent");
    }

    public async Task<ApiResponse> ResetPasswordAsync(ResetPasswordDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            return ApiResponse.FailResponse("Invalid request");

        var result = await _userManager.ResetPasswordAsync(user, dto.Token, dto.NewPassword);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            return ApiResponse.FailResponse(string.Join("; ", errors));
        }

        _logger.LogInformation("Password reset for: {Email}", dto.Email);
        return ApiResponse.SuccessResponse("Password has been reset successfully");
    }

    public async Task<ApiResponse> VerifyEmailAsync(VerifyEmailDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        if (user == null)
            return ApiResponse.FailResponse("Invalid verification request");

        var result = await _userManager.ConfirmEmailAsync(user, dto.Token);
        if (!result.Succeeded)
            return ApiResponse.FailResponse("Email verification failed. The link may have expired.");

        // Send welcome email after verification
        await _emailService.SendWelcomeEmailAsync(user.Email!, user.FirstName);

        _logger.LogInformation("Email verified for: {Email}", dto.Email);
        return ApiResponse.SuccessResponse("Email verified successfully");
    }

    public async Task<ApiResponse> ChangePasswordAsync(string userId, ChangePasswordDto dto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return ApiResponse.FailResponse("User not found");

        var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => e.Description).ToList();
            return ApiResponse.FailResponse(string.Join("; ", errors));
        }

        return ApiResponse.SuccessResponse("Password changed successfully");
    }

    public async Task<ApiResponse> ResendVerificationEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return ApiResponse.SuccessResponse("If an account exists, a verification email has been sent");

        if (user.EmailConfirmed)
            return ApiResponse.FailResponse("Email is already verified");

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        await _emailService.SendVerificationEmailAsync(email, token);

        return ApiResponse.SuccessResponse("Verification email sent");
    }

    // === Private Helpers ===

    private async Task<LoginResponseDto> GenerateLoginResponse(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var token = GenerateJwtToken(user, roles);
        var refreshToken = GenerateRefreshToken();

        // Save refresh token
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(
            int.Parse(_configuration["JwtSettings:RefreshTokenExpiryDays"] ?? "7"));
        await _userManager.UpdateAsync(user);

        var userProfile = _mapper.Map<UserProfileDto>(user);
        userProfile.Roles = roles;

        return new LoginResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
            TokenExpiration = DateTime.UtcNow.AddMinutes(
                int.Parse(_configuration["JwtSettings:TokenExpiryMinutes"] ?? "60")),
            User = userProfile
        };
    }

    private string GenerateJwtToken(ApplicationUser user, IList<string> roles)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Email, user.Email!),
            new(ClaimTypes.Name, user.FullName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new("firstName", user.FirstName),
            new("lastName", user.LastName),
        };

        // Add role claims
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["JwtSettings:Secret"] ?? throw new InvalidOperationException("JWT Secret not configured")));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                int.Parse(_configuration["JwtSettings:TokenExpiryMinutes"] ?? "60")),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private static string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
    {
        try
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                    _configuration["JwtSettings:Secret"]!)),
                ValidIssuer = _configuration["JwtSettings:Issuer"],
                ValidAudience = _configuration["JwtSettings:Audience"],
                ValidateLifetime = false // Allow expired tokens for refresh
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
                return null;

            return principal;
        }
        catch
        {
            return null;
        }
    }
}
