using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Donations;

public class Donation : BaseEntity
{
    public decimal Amount { get; set; }
    public string? Currency { get; set; } = "NGN";
    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public string? DonorPhone { get; set; }
    public bool IsAnonymous { get; set; }
    public string? PaymentMethod { get; set; }
    public string? TransactionId { get; set; }
    public string? PaymentReference { get; set; }
    public string Status { get; set; } = "Pending";
    public string? Notes { get; set; }
    public DateTime? PaidAt { get; set; }

    public Guid? CampaignId { get; set; }
    public DonationCampaign? Campaign { get; set; }

    public Guid? ProjectId { get; set; }
    public ChurchProject? Project { get; set; }

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }
}
