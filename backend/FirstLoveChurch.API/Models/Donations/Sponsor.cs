using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Donations;

public class Sponsor : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Organization { get; set; }
    public string? LogoUrl { get; set; }
    public decimal? Amount { get; set; }
    public string? SponsorType { get; set; }
    public string? Notes { get; set; }
    public bool IsActive { get; set; } = true;
}
