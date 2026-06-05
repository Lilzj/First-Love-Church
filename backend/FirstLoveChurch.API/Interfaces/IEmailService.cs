namespace FirstLoveChurch.API.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string htmlBody);
    Task SendVerificationEmailAsync(string email, string token);
    Task SendPasswordResetEmailAsync(string email, string token);
    Task SendWelcomeEmailAsync(string email, string firstName);
    Task SendNotificationEmailAsync(string email, string subject, string message);
}
