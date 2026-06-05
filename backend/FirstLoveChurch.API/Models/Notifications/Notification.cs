using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Notifications;

public class Notification : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string Type { get; set; } = "General"; // General, Event, Sermon, Donation, PrayerRequest, LiveStream
    public bool IsRead { get; set; }
    public DateTime? ReadAt { get; set; }
    public string? ActionUrl { get; set; }
    public string? ImageUrl { get; set; }

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }
}
