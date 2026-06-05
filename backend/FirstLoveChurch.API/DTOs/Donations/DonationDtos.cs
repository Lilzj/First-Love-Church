namespace FirstLoveChurch.API.DTOs.Donations;

public class CreateDonationDto
{
    public decimal Amount { get; set; }
    public string? Currency { get; set; }
    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public string? DonorPhone { get; set; }
    public bool IsAnonymous { get; set; }
    public string? PaymentMethod { get; set; }
    public Guid? CampaignId { get; set; }
    public Guid? ProjectId { get; set; }
    public string? Notes { get; set; }
}

public class DonationResponseDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string? Currency { get; set; }
    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public bool IsAnonymous { get; set; }
    public string? PaymentMethod { get; set; }
    public string? TransactionId { get; set; }
    public string? PaymentReference { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public string? CampaignTitle { get; set; }
    public string? ProjectTitle { get; set; }
    public DateTime? PaidAt { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateCampaignDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal GoalAmount { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool AllowAnonymous { get; set; } = true;
}

public class UpdateCampaignDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal? GoalAmount { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool? IsActive { get; set; }
    public bool? AllowAnonymous { get; set; }
}

public class CampaignResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal GoalAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal ProgressPercentage => GoalAmount > 0 ? Math.Round((CurrentAmount / GoalAmount) * 100, 2) : 0;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public bool AllowAnonymous { get; set; }
    public string? Slug { get; set; }
    public int DonationCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateProjectDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal GoalAmount { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

public class UpdateProjectDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public decimal? GoalAmount { get; set; }
    public string? ImageUrl { get; set; }
    public string? Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

public class ProjectResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal GoalAmount { get; set; }
    public decimal CurrentAmount { get; set; }
    public decimal ProgressPercentage => GoalAmount > 0 ? Math.Round((CurrentAmount / GoalAmount) * 100, 2) : 0;
    public string Status { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string? Slug { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int DonationCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class SponsorDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Organization { get; set; }
    public string? LogoUrl { get; set; }
    public decimal? Amount { get; set; }
    public string? SponsorType { get; set; }
    public bool IsActive { get; set; }
}

public class CreateSponsorDto
{
    public string Name { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Organization { get; set; }
    public string? LogoUrl { get; set; }
    public decimal? Amount { get; set; }
    public string? SponsorType { get; set; }
    public string? Notes { get; set; }
}

public class ItemDonationDto
{
    public Guid Id { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Quantity { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? DonorName { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime? ReceivedDate { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateItemDonationDto
{
    public string ItemName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int Quantity { get; set; } = 1;
    public string? DonorName { get; set; }
    public string? DonorEmail { get; set; }
    public string? DonorPhone { get; set; }
    public string? ImageUrl { get; set; }
    public string? Notes { get; set; }
}

public class DonationSummaryDto
{
    public decimal TotalDonations { get; set; }
    public int TotalDonorsCount { get; set; }
    public int TotalTransactions { get; set; }
    public decimal ThisMonthTotal { get; set; }
    public decimal LastMonthTotal { get; set; }
    public decimal GrowthPercentage { get; set; }
    public List<MonthlyDonationDto> MonthlyBreakdown { get; set; } = new();
}

public class MonthlyDonationDto
{
    public int Year { get; set; }
    public int Month { get; set; }
    public string MonthName { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public int Count { get; set; }
}

public class PaymentInitiationDto
{
    public decimal Amount { get; set; }
    public string? Email { get; set; }
    public Guid? CampaignId { get; set; }
    public Guid? ProjectId { get; set; }
    public string? Currency { get; set; }
    public string? CallbackUrl { get; set; }
}

public class PaymentVerificationDto
{
    public string Reference { get; set; } = string.Empty;
}
