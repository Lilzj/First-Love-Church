using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Ministry;

public class MinistryMember : BaseEntity
{
    public Guid MinistryId { get; set; }
    public Ministry Ministry { get; set; } = null!;

    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public DateTime JoinDate { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Active";
}
