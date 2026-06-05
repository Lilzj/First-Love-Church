using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Donations;

public class ItemDonation : BaseEntity
{
    public string ItemName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Quantity { get; set; } = 1;
    public string Status { get; set; } = "Pending";
    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public string? DonorPhone { get; set; }
    public string? ImageUrl { get; set; }
    public string? Notes { get; set; }
    public DateTime? ReceivedDate { get; set; }

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }
}
