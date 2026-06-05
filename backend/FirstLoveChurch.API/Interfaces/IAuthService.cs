using FirstLoveChurch.API.DTOs.Auth;
using FirstLoveChurch.API.DTOs.Common;

namespace FirstLoveChurch.API.Interfaces;

public interface IAuthService
{
    Task<ApiResponse<LoginResponseDto>> RegisterAsync(RegisterDto dto);
    Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginDto dto);
    Task<ApiResponse<LoginResponseDto>> RefreshTokenAsync(RefreshTokenDto dto);
    Task<ApiResponse> ForgotPasswordAsync(ForgotPasswordDto dto);
    Task<ApiResponse> ResetPasswordAsync(ResetPasswordDto dto);
    Task<ApiResponse> VerifyEmailAsync(VerifyEmailDto dto);
    Task<ApiResponse> ChangePasswordAsync(string userId, ChangePasswordDto dto);
    Task<ApiResponse> ResendVerificationEmailAsync(string email);
}
