using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Donations;

public class ChurchProject : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal GoalAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public string Status { get; set; } = "Active";
    public string? ImageUrl { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Slug { get; set; }

    public ICollection<Donation> Donations { get; set; } = new List<Donation>();
}
