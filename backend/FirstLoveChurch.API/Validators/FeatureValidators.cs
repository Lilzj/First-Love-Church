using FirstLoveChurch.API.DTOs.Events;
using FirstLoveChurch.API.DTOs.Donations;
using FirstLoveChurch.API.DTOs.Blog;
using FirstLoveChurch.API.DTOs.Ministry;
using FirstLoveChurch.API.DTOs.LiveStream;
using FirstLoveChurch.API.DTOs.PrayerRequests;
using FirstLoveChurch.API.DTOs.Schedule;
using FluentValidation;

namespace FirstLoveChurch.API.Validators;

// === Events ===
public class CreateEventDtoValidator : AbstractValidator<CreateEventDto>
{
    public CreateEventDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
        RuleFor(x => x.StartDate).NotEmpty().GreaterThan(DateTime.MinValue);
        RuleFor(x => x.EndDate).GreaterThan(x => x.StartDate).When(x => x.EndDate.HasValue).WithMessage("End date must be after start date");
    }
}

// === Donations ===
public class CreateDonationDtoValidator : AbstractValidator<CreateDonationDto>
{
    public CreateDonationDtoValidator()
    {
        RuleFor(x => x.Amount).GreaterThan(0).WithMessage("Amount must be greater than zero");
        RuleFor(x => x.DonorEmail).EmailAddress().When(x => !string.IsNullOrEmpty(x.DonorEmail));
    }
}

public class CreateCampaignDtoValidator : AbstractValidator<CreateCampaignDto>
{
    public CreateCampaignDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
        RuleFor(x => x.GoalAmount).GreaterThanOrEqualTo(0);
    }
}

public class CreateProjectDtoValidator : AbstractValidator<CreateProjectDto>
{
    public CreateProjectDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
    }
}

// === Blog ===
public class CreateBlogPostDtoValidator : AbstractValidator<CreateBlogPostDto>
{
    public CreateBlogPostDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
        RuleFor(x => x.Status).Must(s => s == "Draft" || s == "Published").WithMessage("Status must be Draft or Published");
    }
}

public class CreateBlogCategoryDtoValidator : AbstractValidator<CreateBlogCategoryDto>
{
    public CreateBlogCategoryDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
    }
}

public class CreateBlogCommentDtoValidator : AbstractValidator<CreateBlogCommentDto>
{
    public CreateBlogCommentDtoValidator()
    {
        RuleFor(x => x.Content).NotEmpty().MaximumLength(5000);
    }
}

// === Ministry ===
public class CreateMinistryDtoValidator : AbstractValidator<CreateMinistryDto>
{
    public CreateMinistryDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty().MaximumLength(300);
        RuleFor(x => x.ContactEmail).EmailAddress().When(x => !string.IsNullOrEmpty(x.ContactEmail));
    }
}

// === LiveStream ===
public class CreateLiveStreamDtoValidator : AbstractValidator<CreateLiveStreamDto>
{
    public CreateLiveStreamDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(500);
        RuleFor(x => x.StreamUrl).NotEmpty().MaximumLength(1000);
    }
}

// === Prayer Requests ===
public class CreatePrayerRequestDtoValidator : AbstractValidator<CreatePrayerRequestDto>
{
    public CreatePrayerRequestDtoValidator()
    {
        RuleFor(x => x.Content).NotEmpty().MaximumLength(5000);
    }
}

// === Schedule ===
public class CreateWeeklyActivityDtoValidator : AbstractValidator<CreateWeeklyActivityDto>
{
    public CreateWeeklyActivityDtoValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(300);
        RuleFor(x => x.StartTime).NotEmpty();
        RuleFor(x => x.EndTime).NotEmpty().GreaterThan(x => x.StartTime).WithMessage("End time must be after start time");
    }
}
