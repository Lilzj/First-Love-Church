namespace FirstLoveChurch.API.DTOs.Schedule;

public class CreateWeeklyActivityDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string? Location { get; set; }
    public string ActivityType { get; set; } = "Service";
    public bool IsRecurring { get; set; } = true;
    public string? LeaderName { get; set; }
    public string? ImageUrl { get; set; }
    public int SortOrder { get; set; }
}

public class UpdateWeeklyActivityDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DayOfWeek? DayOfWeek { get; set; }
    public TimeSpan? StartTime { get; set; }
    public TimeSpan? EndTime { get; set; }
    public string? Location { get; set; }
    public string? ActivityType { get; set; }
    public bool? IsRecurring { get; set; }
    public bool? IsActive { get; set; }
    public string? LeaderName { get; set; }
    public string? ImageUrl { get; set; }
    public int? SortOrder { get; set; }
}

public class WeeklyActivityResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public string DayName => DayOfWeek.ToString();
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string? Location { get; set; }
    public string ActivityType { get; set; } = string.Empty;
    public bool IsRecurring { get; set; }
    public bool IsActive { get; set; }
    public string? LeaderName { get; set; }
    public string? ImageUrl { get; set; }
    public int SortOrder { get; set; }
}
