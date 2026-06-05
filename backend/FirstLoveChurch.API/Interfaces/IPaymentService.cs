namespace FirstLoveChurch.API.Interfaces;

/// <summary>
/// Payment service abstraction for easy provider swapping.
/// Currently implemented with Paystack. To add another provider,
/// create a new implementation of this interface.
/// </summary>
public interface IPaymentService
{
    /// <summary>
    /// Initialize a payment transaction.
    /// Returns authorization URL and reference.
    /// </summary>
    Task<PaymentInitiationResponse> InitializePaymentAsync(PaymentRequest request);

    /// <summary>
    /// Verify a payment transaction by reference.
    /// </summary>
    Task<PaymentVerificationResponse> VerifyPaymentAsync(string reference);
}

public class PaymentRequest
{
    public decimal Amount { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Currency { get; set; } = "NGN";
    public string? CallbackUrl { get; set; }
    public Dictionary<string, string>? Metadata { get; set; }
}

public class PaymentInitiationResponse
{
    public bool Success { get; set; }
    public string? AuthorizationUrl { get; set; }
    public string? Reference { get; set; }
    public string? AccessCode { get; set; }
    public string? Message { get; set; }
}

public class PaymentVerificationResponse
{
    public bool Success { get; set; }
    public string? Reference { get; set; }
    public decimal Amount { get; set; }
    public string? Currency { get; set; }
    public string? Status { get; set; }
    public string? TransactionId { get; set; }
    public string? Channel { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? Message { get; set; }
}
