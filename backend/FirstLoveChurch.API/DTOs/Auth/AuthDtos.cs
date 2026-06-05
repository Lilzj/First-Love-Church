using System.ComponentModel.DataAnnotations;

namespace FirstLoveChurch.API.DTOs.Auth;

public class RegisterDto
{
    [Required]
    public string FirstName { get; set; } = string.Empty;
    
    [Required]
    public string LastName { get; set; } = string.Empty;
    
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required, MinLength(8)]
    public string Password { get; set; } = string.Empty;
    
    [Required, Compare("Password")]
    public string ConfirmPassword { get; set; } = string.Empty;
    
    public string? PhoneNumber { get; set; }
    public string? Gender { get; set; }
    public DateTime? DateOfBirth { get; set; }
}

public class LoginDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Password { get; set; } = string.Empty;
}

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime TokenExpiration { get; set; }
    public UserProfileDto User { get; set; } = null!;
}

public class RefreshTokenDto
{
    [Required]
    public string Token { get; set; } = string.Empty;
    
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}

public class ForgotPasswordDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
}

public class ResetPasswordDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Token { get; set; } = string.Empty;
    
    [Required, MinLength(8)]
    public string NewPassword { get; set; } = string.Empty;
    
    [Required, Compare("NewPassword")]
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;
    
    [Required, MinLength(8)]
    public string NewPassword { get; set; } = string.Empty;
    
    [Required, Compare("NewPassword")]
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class VerifyEmailDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Token { get; set; } = string.Empty;
}

public class UserProfileDto
{
    public string Id { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? Address { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public DateTime MemberSince { get; set; }
    public bool IsActive { get; set; }
    public string? Bio { get; set; }
    public IList<string> Roles { get; set; } = new List<string>();
}

public class UpdateProfileDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Gender { get; set; }
    public string? Bio { get; set; }
}

public class AssignRoleDto
{
    [Required]
    public string UserId { get; set; } = string.Empty;
    
    [Required]
    public string RoleName { get; set; } = string.Empty;
}
