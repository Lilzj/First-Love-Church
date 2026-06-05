using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Events;

public class Event : BaseEntity
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
    public string Status { get; set; } = "Upcoming";
    public string? Slug { get; set; }
    public string? ContactEmail { get; set; }
    public string? ContactPhone { get; set; }

    public string? OrganizerId { get; set; }
    public ApplicationUser? Organizer { get; set; }

    public ICollection<EventRegistration> Registrations { get; set; } = new List<EventRegistration>();
    public ICollection<EventAttendance> Attendances { get; set; } = new List<EventAttendance>();
    public ICollection<VolunteerSignup> VolunteerSignups { get; set; } = new List<VolunteerSignup>();
}
