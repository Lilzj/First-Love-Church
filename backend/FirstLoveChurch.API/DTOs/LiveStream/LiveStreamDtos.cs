namespace FirstLoveChurch.API.DTOs.LiveStream;

public class CreateLiveStreamDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string StreamUrl { get; set; } = string.Empty;
    public string? Platform { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public string? ThumbnailUrl { get; set; }
}

public class UpdateLiveStreamDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? StreamUrl { get; set; }
    public string? Platform { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string? Status { get; set; }
}

public class LiveStreamResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string StreamUrl { get; set; } = string.Empty;
    public string? Platform { get; set; }
    public DateTime? ScheduledAt { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public string? ThumbnailUrl { get; set; }
    public string Status { get; set; } = string.Empty;
    public int ViewerCount { get; set; }
    public string? Slug { get; set; }
    public DateTime CreatedAt { get; set; }
}
