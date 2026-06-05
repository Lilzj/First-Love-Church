namespace FirstLoveChurch.API.DTOs.Dashboard;

public class DashboardSummaryDto
{
    public int TotalMembers { get; set; }
    public int TotalSermons { get; set; }
    public int TotalEvents { get; set; }
    public int TotalBlogPosts { get; set; }
    public int TotalMinistries { get; set; }
    public int TotalPrayerRequests { get; set; }
    public decimal TotalDonations { get; set; }
    public int ActiveCampaigns { get; set; }
    public int UpcomingEvents { get; set; }
    public int PendingPrayerRequests { get; set; }
    public int NewMembersThisMonth { get; set; }
    public DonationAnalyticsDto DonationAnalytics { get; set; } = new();
    public AttendanceAnalyticsDto AttendanceAnalytics { get; set; } = new();
    public SermonAnalyticsDto SermonAnalytics { get; set; } = new();
}

public class DonationAnalyticsDto
{
    public decimal TotalAmount { get; set; }
    public decimal ThisMonthAmount { get; set; }
    public decimal LastMonthAmount { get; set; }
    public decimal GrowthPercentage { get; set; }
    public int TotalDonors { get; set; }
    public List<MonthlyStatDto> MonthlyTrend { get; set; } = new();
    public List<CampaignProgressDto> TopCampaigns { get; set; } = new();
}

public class AttendanceAnalyticsDto
{
    public int TotalAttendance { get; set; }
    public double AverageAttendance { get; set; }
    public int ThisMonthAttendance { get; set; }
    public int LastMonthAttendance { get; set; }
    public List<MonthlyStatDto> MonthlyTrend { get; set; } = new();
}

public class SermonAnalyticsDto
{
    public int TotalSermons { get; set; }
    public int TotalViews { get; set; }
    public int TotalLikes { get; set; }
    public int TotalComments { get; set; }
    public List<TopSermonDto> TopSermons { get; set; } = new();
}

public class EngagementMetricsDto
{
    public int TotalPageViews { get; set; }
    public int TotalSermonViews { get; set; }
    public int TotalBlogViews { get; set; }
    public int TotalComments { get; set; }
    public int TotalPrayerReactions { get; set; }
    public int TotalEventRegistrations { get; set; }
    public int ActiveUsers { get; set; }
}

public class MonthlyStatDto
{
    public int Year { get; set; }
    public int Month { get; set; }
    public string MonthName { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public int Count { get; set; }
}

public class CampaignProgressDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal GoalAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal ProgressPercentage { get; set; }
}

public class TopSermonDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ViewCount { get; set; }
    public int LikeCount { get; set; }
}
