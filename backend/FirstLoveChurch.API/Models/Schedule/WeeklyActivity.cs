using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Schedule;

public class WeeklyActivity : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string? Location { get; set; }
    public string ActivityType { get; set; } = "Service"; // Service, BibleStudy, Prayer, Fellowship, Special
    public bool IsRecurring { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public string? LeaderName { get; set; }
    public string? ImageUrl { get; set; }
    public int SortOrder { get; set; }
}
