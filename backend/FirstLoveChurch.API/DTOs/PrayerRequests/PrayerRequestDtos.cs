namespace FirstLoveChurch.API.DTOs.PrayerRequests;

public class CreatePrayerRequestDto
{
    public string? Title { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? RequestedBy { get; set; }
    public bool IsAnonymous { get; set; }
    public bool IsPublic { get; set; } = true;
}

public class PrayerRequestResponseDto
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? RequestedBy { get; set; }
    public bool IsAnonymous { get; set; }
    public bool IsPublic { get; set; }
    public string Status { get; set; } = string.Empty;
    public int PrayerCount { get; set; }
    public string? AdminNotes { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class ModeratePrayerRequestDto
{
    public string Status { get; set; } = string.Empty; // Approved, Rejected
    public string? AdminNotes { get; set; }
}

public class PrayerReactionDto
{
    public string ReactionType { get; set; } = "Praying"; // Praying, Amen, Support
}
