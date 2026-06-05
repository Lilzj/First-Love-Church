using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Events;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Events;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public EventsController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents([FromQuery] PaginationParams paginationParams, [FromQuery] string? status)
    {
        System.Linq.Expressions.Expression<Func<Event, bool>>? filter = null;
        if (!string.IsNullOrEmpty(status))
            filter = e => e.Status == status;

        var result = await _unitOfWork.Repository<Event>().GetPagedAsync(
            paginationParams, filter, q => q.OrderByDescending(e => e.StartDate),
            "Organizer,Registrations,Attendances,VolunteerSignups");

        var mapped = new PagedResult<EventListDto>
        {
            Items = _mapper.Map<IReadOnlyList<EventListDto>>(result.Items),
            TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize
        };

        return Ok(ApiResponse<PagedResult<EventListDto>>.SuccessResponse(mapped));
    }

    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcomingEvents([FromQuery] int count = 10)
    {
        var events = await _unitOfWork.Repository<Event>().FindAsync(
            e => e.StartDate >= DateTime.UtcNow, "Registrations");
        var ordered = events.OrderBy(e => e.StartDate).Take(count).ToList();
        return Ok(ApiResponse<List<EventListDto>>.SuccessResponse(_mapper.Map<List<EventListDto>>(ordered)));
    }

    [HttpGet("past")]
    public async Task<IActionResult> GetPastEvents([FromQuery] PaginationParams paginationParams)
    {
        var result = await _unitOfWork.Repository<Event>().GetPagedAsync(paginationParams,
            e => e.StartDate < DateTime.UtcNow, q => q.OrderByDescending(e => e.StartDate));
        var mapped = new PagedResult<EventListDto>
        {
            Items = _mapper.Map<IReadOnlyList<EventListDto>>(result.Items),
            TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize
        };
        return Ok(ApiResponse<PagedResult<EventListDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(Guid id)
    {
        var ev = await _unitOfWork.Repository<Event>().GetByIdAsync(id,
            "Organizer,Registrations,Attendances,VolunteerSignups");
        if (ev == null) return NotFound(ApiResponse.FailResponse("Event not found"));
        return Ok(ApiResponse<EventResponseDto>.SuccessResponse(_mapper.Map<EventResponseDto>(ev)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateEvent([FromBody] CreateEventDto dto)
    {
        var ev = _mapper.Map<Event>(dto);
        ev.Slug = SlugHelper.GenerateSlug(dto.Title);
        ev.OrganizerId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        await _unitOfWork.Repository<Event>().AddAsync(ev);
        await _unitOfWork.SaveChangesAsync();
        return CreatedAtAction(nameof(GetEvent), new { id = ev.Id },
            ApiResponse<EventResponseDto>.SuccessResponse(_mapper.Map<EventResponseDto>(ev), "Event created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> UpdateEvent(Guid id, [FromBody] UpdateEventDto dto)
    {
        var ev = await _unitOfWork.Repository<Event>().GetByIdAsync(id);
        if (ev == null) return NotFound(ApiResponse.FailResponse("Event not found"));
        _mapper.Map(dto, ev);
        _unitOfWork.Repository<Event>().Update(ev);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<EventResponseDto>.SuccessResponse(_mapper.Map<EventResponseDto>(ev), "Event updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteEvent(Guid id)
    {
        var ev = await _unitOfWork.Repository<Event>().GetByIdAsync(id);
        if (ev == null) return NotFound(ApiResponse.FailResponse("Event not found"));
        _unitOfWork.Repository<Event>().Delete(ev);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Event deleted"));
    }

    [HttpPost("{id}/register")]
    [Authorize]
    public async Task<IActionResult> RegisterForEvent(Guid id, [FromBody] EventRegistrationDto dto)
    {
        var ev = await _unitOfWork.Repository<Event>().GetByIdAsync(id, "Registrations");
        if (ev == null) return NotFound(ApiResponse.FailResponse("Event not found"));

        if (ev.MaxAttendees.HasValue && ev.Registrations.Count >= ev.MaxAttendees.Value)
            return BadRequest(ApiResponse.FailResponse("Event is fully booked"));

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var registration = new EventRegistration
        {
            EventId = id, UserId = userId, GuestName = dto.GuestName,
            GuestEmail = dto.GuestEmail, GuestPhone = dto.GuestPhone, Notes = dto.Notes
        };
        await _unitOfWork.Repository<EventRegistration>().AddAsync(registration);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<EventRegistrationResponseDto>.SuccessResponse(
            _mapper.Map<EventRegistrationResponseDto>(registration), "Registered for event"));
    }

    [HttpPost("{id}/attendance")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> RecordAttendance(Guid id, [FromBody] EventAttendanceDto dto)
    {
        if (!await _unitOfWork.Repository<Event>().ExistsAsync(id))
            return NotFound(ApiResponse.FailResponse("Event not found"));

        var attendance = new EventAttendance
        {
            EventId = id, UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
            AttendeeName = dto.AttendeeName, Notes = dto.Notes
        };
        await _unitOfWork.Repository<EventAttendance>().AddAsync(attendance);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Attendance recorded"));
    }

    [HttpPost("{id}/volunteer")]
    [Authorize]
    public async Task<IActionResult> VolunteerSignup(Guid id, [FromBody] VolunteerSignupDto dto)
    {
        if (!await _unitOfWork.Repository<Event>().ExistsAsync(id))
            return NotFound(ApiResponse.FailResponse("Event not found"));

        var signup = new VolunteerSignup
        {
            EventId = id, UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value!,
            Role = dto.Role, Notes = dto.Notes
        };
        await _unitOfWork.Repository<VolunteerSignup>().AddAsync(signup);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Volunteer signup successful"));
    }

    [HttpGet("{id}/registrations")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> GetRegistrations(Guid id)
    {
        var registrations = await _unitOfWork.Repository<EventRegistration>().FindAsync(r => r.EventId == id, "User");
        return Ok(ApiResponse<IReadOnlyList<EventRegistrationResponseDto>>.SuccessResponse(
            _mapper.Map<IReadOnlyList<EventRegistrationResponseDto>>(registrations)));
    }
}
