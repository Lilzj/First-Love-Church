using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Ministry;

public class Ministry : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Mission { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; } = true;
    public string? MeetingSchedule { get; set; }
    public string? Slug { get; set; }
    public string? ContactEmail { get; set; }

    public ICollection<MinistryLeader> Leaders { get; set; } = new List<MinistryLeader>();
    public ICollection<MinistryMember> Members { get; set; } = new List<MinistryMember>();
}
