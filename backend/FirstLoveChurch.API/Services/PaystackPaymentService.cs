using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using FirstLoveChurch.API.Interfaces;

namespace FirstLoveChurch.API.Services;

/// <summary>
/// Paystack payment service implementation.
/// To switch providers, create a new IPaymentService implementation
/// and register it in DI instead of this one.
/// </summary>
public class PaystackPaymentService : IPaymentService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<PaystackPaymentService> _logger;
    private readonly string _secretKey;

    public PaystackPaymentService(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<PaystackPaymentService> logger)
    {
        _httpClient = httpClientFactory.CreateClient("Paystack");
        _configuration = configuration;
        _logger = logger;
        _secretKey = _configuration["Paystack:SecretKey"]
            ?? throw new InvalidOperationException("Paystack secret key not configured");

        _httpClient.BaseAddress = new Uri("https://api.paystack.co/");
        _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_secretKey}");
    }

    public async Task<PaymentInitiationResponse> InitializePaymentAsync(PaymentRequest request)
    {
        try
        {
            var payload = new
            {
                email = request.Email,
                amount = (int)(request.Amount * 100), // Paystack uses kobo/cents
                currency = request.Currency ?? "NGN",
                callback_url = request.CallbackUrl,
                metadata = request.Metadata
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("transaction/initialize", content);
            var responseBody = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var result = JsonSerializer.Deserialize<PaystackInitializeResponse>(responseBody);
                if (result?.Status == true)
                {
                    return new PaymentInitiationResponse
                    {
                        Success = true,
                        AuthorizationUrl = result.Data?.AuthorizationUrl,
                        Reference = result.Data?.Reference,
                        AccessCode = result.Data?.AccessCode,
                        Message = result.Message
                    };
                }
            }

            _logger.LogWarning("Paystack initialization failed: {Response}", responseBody);
            return new PaymentInitiationResponse { Success = false, Message = "Payment initialization failed" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error initializing Paystack payment");
            return new PaymentInitiationResponse { Success = false, Message = "Payment service error" };
        }
    }

    public async Task<PaymentVerificationResponse> VerifyPaymentAsync(string reference)
    {
        try
        {
            var response = await _httpClient.GetAsync($"transaction/verify/{reference}");
            var responseBody = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                var result = JsonSerializer.Deserialize<PaystackVerifyResponse>(responseBody);
                if (result?.Status == true && result.Data?.Status == "success")
                {
                    return new PaymentVerificationResponse
                    {
                        Success = true,
                        Reference = result.Data.Reference,
                        Amount = result.Data.Amount / 100m, // Convert from kobo to naira
                        Currency = result.Data.Currency,
                        Status = result.Data.Status,
                        TransactionId = result.Data.Id?.ToString(),
                        Channel = result.Data.Channel,
                        PaidAt = result.Data.PaidAt,
                        Message = "Payment verified"
                    };
                }
            }

            return new PaymentVerificationResponse { Success = false, Message = "Payment verification failed" };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error verifying Paystack payment: {Reference}", reference);
            return new PaymentVerificationResponse { Success = false, Message = "Payment verification error" };
        }
    }
}

// Paystack API response models
internal class PaystackInitializeResponse
{
    [JsonPropertyName("status")] public bool Status { get; set; }
    [JsonPropertyName("message")] public string? Message { get; set; }
    [JsonPropertyName("data")] public PaystackInitializeData? Data { get; set; }
}

internal class PaystackInitializeData
{
    [JsonPropertyName("authorization_url")] public string? AuthorizationUrl { get; set; }
    [JsonPropertyName("access_code")] public string? AccessCode { get; set; }
    [JsonPropertyName("reference")] public string? Reference { get; set; }
}

internal class PaystackVerifyResponse
{
    [JsonPropertyName("status")] public bool Status { get; set; }
    [JsonPropertyName("message")] public string? Message { get; set; }
    [JsonPropertyName("data")] public PaystackVerifyData? Data { get; set; }
}

internal class PaystackVerifyData
{
    [JsonPropertyName("id")] public long? Id { get; set; }
    [JsonPropertyName("status")] public string? Status { get; set; }
    [JsonPropertyName("reference")] public string? Reference { get; set; }
    [JsonPropertyName("amount")] public decimal Amount { get; set; }
    [JsonPropertyName("currency")] public string? Currency { get; set; }
    [JsonPropertyName("channel")] public string? Channel { get; set; }
    [JsonPropertyName("paid_at")] public DateTime? PaidAt { get; set; }
}
