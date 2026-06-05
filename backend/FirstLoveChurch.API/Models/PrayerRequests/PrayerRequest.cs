using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.PrayerRequests;

public class PrayerRequest : BaseEntity
{
    public string? Title { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? RequestedBy { get; set; }
    public bool IsAnonymous { get; set; }
    public bool IsPublic { get; set; } = true;
    public string Status { get; set; } = "Pending"; // Pending, Approved, Rejected
    public int PrayerCount { get; set; }
    public string? AdminNotes { get; set; }

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }

    public ICollection<PrayerReaction> Reactions { get; set; } = new List<PrayerReaction>();
}
