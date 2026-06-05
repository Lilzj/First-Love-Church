namespace FirstLoveChurch.API.DTOs.Events;

public class CreateEventDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Location { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsRecurring { get; set; }
    public string? RecurrencePattern { get; set; }
    public int? MaxAttendees { get; set; }
    public DateTime? RegistrationDeadline { get; set; }
    public string EventType { get; set; } = "General";
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
}

public class UpdateEventDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool? IsRecurring { get; set; }
    public string? RecurrencePattern { get; set; }
    public int? MaxAttendees { get; set; }
    public DateTime? RegistrationDeadline { get; set; }
    public string? EventType { get; set; }
    public string? Status { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
}

public class EventResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Location { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsRecurring { get; set; }
    public string? RecurrencePattern { get; set; }
    public int? MaxAttendees { get; set; }
    public DateTime? RegistrationDeadline { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }
    public string? OrganizerName { get; set; }
    public int RegistrationCount { get; set; }
    public int AttendanceCount { get; set; }
    public int VolunteerCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class EventListDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? ImageUrl { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public int RegistrationCount { get; set; }
}

public class EventRegistrationDto
{
    public string? GuestName { get; set; }
    public string? GuestEmail { get; set; }
    public string? GuestPhone { get; set; }
    public string? Notes { get; set; }
}

public class EventRegistrationResponseDto
{
    public Guid Id { get; set; }
    public Guid EventId { get; set; }
    public string? UserName { get; set; }
    public string? GuestName { get; set; }
    public string? GuestEmail { get; set; }
    public DateTime RegistrationDate { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class EventAttendanceDto
{
    public string? AttendeeName { get; set; }
    public string? Notes { get; set; }
}

public class VolunteerSignupDto
{
    public string? Role { get; set; }
    public string? Notes { get; set; }
}

public class VolunteerSignupResponseDto
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? Role { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
