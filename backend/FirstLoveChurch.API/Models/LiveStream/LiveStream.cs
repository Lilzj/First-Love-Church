using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.LiveStream;

public class LiveStream : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string StreamUrl { get; set; } = string.Empty;
    public string? Platform { get; set; } // YouTube, Facebook, Custom
    public DateTime? ScheduledAt { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string Status { get; set; } = "Scheduled"; // Scheduled, Live, Ended
    public int ViewerCount { get; set; }
    public string? Slug { get; set; }
    public bool NotificationSent { get; set; }
}
