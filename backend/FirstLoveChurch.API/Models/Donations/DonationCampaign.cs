using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Donations;

public class DonationCampaign : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal GoalAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public bool AllowAnonymous { get; set; } = true;
    public string? Slug { get; set; }

    public ICollection<Donation> Donations { get; set; } = new List<Donation>();
}
