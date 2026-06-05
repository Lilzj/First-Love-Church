namespace FirstLoveChurch.API.DTOs.Ministry;

public class CreateMinistryDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Mission { get; set; }
    public string? ImageUrl { get; set; }
    public string? MeetingSchedule { get; set; }
    public string? ContactEmail { get; set; }
}

public class UpdateMinistryDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Mission { get; set; }
    public string? ImageUrl { get; set; }
    public bool? IsActive { get; set; }
    public string? MeetingSchedule { get; set; }
    public string? ContactEmail { get; set; }
}

public class MinistryResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Mission { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public string? MeetingSchedule { get; set; }
    public string? Slug { get; set; }
    public string? ContactEmail { get; set; }
    public int LeaderCount { get; set; }
    public int MemberCount { get; set; }
    public List<MinistryLeaderDto> Leaders { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class MinistryListDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsActive { get; set; }
    public string? Slug { get; set; }
    public int MemberCount { get; set; }
}

public class MinistryLeaderDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string? UserImageUrl { get; set; }
    public string? Role { get; set; }
    public DateTime StartDate { get; set; }
    public bool IsActive { get; set; }
}

public class AddMinistryLeaderDto
{
    public string UserId { get; set; } = string.Empty;
    public string? Role { get; set; }
}

public class MinistryMemberDto
{
    public Guid Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string? UserImageUrl { get; set; }
    public DateTime JoinDate { get; set; }
    public string Status { get; set; } = string.Empty;
}

public class AddMinistryMemberDto
{
    public string UserId { get; set; } = string.Empty;
}
