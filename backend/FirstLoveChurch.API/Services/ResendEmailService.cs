using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using FirstLoveChurch.API.Interfaces;

namespace FirstLoveChurch.API.Services;

public class ResendEmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<ResendEmailService> _logger;
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _fromEmail;
    private readonly string _fromName;
    private readonly string _frontendUrl;

    public ResendEmailService(
        IConfiguration configuration,
        ILogger<ResendEmailService> logger,
        IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _logger = logger;
        _httpClient = httpClientFactory.CreateClient("Resend");
        _apiKey = _configuration["Resend:ApiKey"] ?? throw new InvalidOperationException("Resend API key not configured");
        _fromEmail = _configuration["Resend:FromEmail"] ?? "noreply@firstlovechurch.org";
        _fromName = _configuration["Resend:FromName"] ?? "First Love Church";
        _frontendUrl = _configuration["AppSettings:FrontendUrl"] ?? "http://localhost:5173";
    }

    public async Task SendEmailAsync(string to, string subject, string htmlBody)
    {
        try
        {
            var payload = new
            {
                from = $"{_fromName} <{_fromEmail}>",
                to = new[] { to },
                subject,
                html = htmlBody
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _apiKey);

            var response = await _httpClient.PostAsync("https://api.resend.com/emails", content);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("Email sent successfully to {To}", to);
            }
            else
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                _logger.LogWarning("Failed to send email to {To}. Status: {Status}. Response: {Response}",
                    to, response.StatusCode, responseBody);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email to {To}", to);
        }
    }

    public async Task SendVerificationEmailAsync(string email, string token)
    {
        var encodedToken = Uri.EscapeDataString(token);
        var verificationUrl = $"{_frontendUrl}/verify-email?email={email}&token={encodedToken}";

        var html = $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;'>
                <h1 style='color: white; margin: 0;'>First Love Church</h1>
            </div>
            <div style='padding: 40px 20px; background: #ffffff; border: 1px solid #e0e0e0;'>
                <h2 style='color: #333;'>Verify Your Email</h2>
                <p style='color: #666; line-height: 1.6;'>Thank you for registering! Please click the button below to verify your email address.</p>
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{verificationUrl}' style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;'>Verify Email</a>
                </div>
                <p style='color: #999; font-size: 14px;'>If you didn't create an account, you can safely ignore this email.</p>
            </div>
            <div style='padding: 20px; text-align: center; color: #999; font-size: 12px;'>
                <p>© {DateTime.UtcNow.Year} First Love Church. All rights reserved.</p>
            </div>
        </div>";

        await SendEmailAsync(email, "Verify Your Email - First Love Church", html);
    }

    public async Task SendPasswordResetEmailAsync(string email, string token)
    {
        var encodedToken = Uri.EscapeDataString(token);
        var resetUrl = $"{_frontendUrl}/reset-password?email={email}&token={encodedToken}";

        var html = $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;'>
                <h1 style='color: white; margin: 0;'>First Love Church</h1>
            </div>
            <div style='padding: 40px 20px; background: #ffffff; border: 1px solid #e0e0e0;'>
                <h2 style='color: #333;'>Reset Your Password</h2>
                <p style='color: #666; line-height: 1.6;'>We received a request to reset your password. Click the button below to set a new password.</p>
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{resetUrl}' style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;'>Reset Password</a>
                </div>
                <p style='color: #999; font-size: 14px;'>If you didn't request this, please ignore this email. This link expires in 24 hours.</p>
            </div>
        </div>";

        await SendEmailAsync(email, "Reset Your Password - First Love Church", html);
    }

    public async Task SendWelcomeEmailAsync(string email, string firstName)
    {
        var html = $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;'>
                <h1 style='color: white; margin: 0;'>Welcome to First Love Church!</h1>
            </div>
            <div style='padding: 40px 20px; background: #ffffff; border: 1px solid #e0e0e0;'>
                <h2 style='color: #333;'>Hello {firstName}! 🎉</h2>
                <p style='color: #666; line-height: 1.6;'>We're so glad you've joined our church family. Here's what you can do on our platform:</p>
                <ul style='color: #666; line-height: 2;'>
                    <li>📖 Watch and listen to sermons</li>
                    <li>📅 Register for church events</li>
                    <li>🙏 Submit prayer requests</li>
                    <li>💝 Support our church through donations</li>
                    <li>📝 Read inspiring blog articles</li>
                </ul>
                <div style='text-align: center; margin: 30px 0;'>
                    <a href='{_frontendUrl}' style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;'>Explore Now</a>
                </div>
            </div>
        </div>";

        await SendEmailAsync(email, $"Welcome {firstName}! - First Love Church", html);
    }

    public async Task SendNotificationEmailAsync(string email, string subject, string message)
    {
        var html = $@"
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <div style='background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0;'>
                <h1 style='color: white; margin: 0; font-size: 20px;'>First Love Church</h1>
            </div>
            <div style='padding: 30px 20px; background: #ffffff; border: 1px solid #e0e0e0;'>
                <p style='color: #666; line-height: 1.6;'>{message}</p>
            </div>
        </div>";

        await SendEmailAsync(email, subject, html);
    }
}
