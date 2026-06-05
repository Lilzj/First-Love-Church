using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.PrayerRequests;

public class PrayerReaction : BaseEntity
{
    public Guid PrayerRequestId { get; set; }
    public PrayerRequest PrayerRequest { get; set; } = null!;

    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public string ReactionType { get; set; } = "Praying"; // Praying, Amen, Support
}
