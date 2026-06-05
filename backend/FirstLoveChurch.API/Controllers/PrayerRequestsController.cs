using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.PrayerRequests;
using FirstLoveChurch.API.Hubs;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.PrayerRequests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/prayer-requests")]
public class PrayerRequestsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IHubContext<NotificationHub> _hubContext;
    public PrayerRequestsController(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<NotificationHub> hubContext) { _unitOfWork = unitOfWork; _mapper = mapper; _hubContext = hubContext; }

    [HttpGet("prayer-wall")]
    public async Task<IActionResult> GetPrayerWall([FromQuery] PaginationParams p)
    {
        var result = await _unitOfWork.Repository<PrayerRequest>().GetPagedAsync(p, pr => pr.IsPublic && pr.Status == "Approved");
        var mapped = new PagedResult<PrayerRequestResponseDto> { Items = _mapper.Map<IReadOnlyList<PrayerRequestResponseDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<PrayerRequestResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams p, [FromQuery] string? status)
    {
        System.Linq.Expressions.Expression<Func<PrayerRequest, bool>>? filter = !string.IsNullOrEmpty(status) ? pr => pr.Status == status : null;
        var result = await _unitOfWork.Repository<PrayerRequest>().GetPagedAsync(p, filter);
        var mapped = new PagedResult<PrayerRequestResponseDto> { Items = _mapper.Map<IReadOnlyList<PrayerRequestResponseDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<PrayerRequestResponseDto>>.SuccessResponse(mapped));
    }

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] CreatePrayerRequestDto dto)
    {
        var request = _mapper.Map<PrayerRequest>(dto);
        request.UserId = User.Identity?.IsAuthenticated == true ? User.FindFirst(ClaimTypes.NameIdentifier)?.Value : null;
        await _unitOfWork.Repository<PrayerRequest>().AddAsync(request);
        await _unitOfWork.SaveChangesAsync();

        // Notify admins of new prayer request
        await _hubContext.Clients.Group("admins").SendAsync("NewPrayerRequest", _mapper.Map<PrayerRequestResponseDto>(request));

        return Ok(ApiResponse<PrayerRequestResponseDto>.SuccessResponse(_mapper.Map<PrayerRequestResponseDto>(request), "Prayer request submitted", 201));
    }

    [HttpPut("{id}/moderate")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> Moderate(Guid id, [FromBody] ModeratePrayerRequestDto dto)
    {
        var request = await _unitOfWork.Repository<PrayerRequest>().GetByIdAsync(id);
        if (request == null) return NotFound(ApiResponse.FailResponse("Prayer request not found"));
        request.Status = dto.Status;
        request.AdminNotes = dto.AdminNotes;
        _unitOfWork.Repository<PrayerRequest>().Update(request);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse($"Prayer request {dto.Status.ToLower()}"));
    }

    [HttpPost("{id}/pray")]
    [Authorize]
    public async Task<IActionResult> Pray(Guid id)
    {
        var request = await _unitOfWork.Repository<PrayerRequest>().GetByIdAsync(id);
        if (request == null) return NotFound(ApiResponse.FailResponse("Prayer request not found"));

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        var existing = await _unitOfWork.Repository<PrayerReaction>().AnyAsync(r => r.PrayerRequestId == id && r.UserId == userId);
        if (!existing)
        {
            await _unitOfWork.Repository<PrayerReaction>().AddAsync(new PrayerReaction { PrayerRequestId = id, UserId = userId });
            request.PrayerCount++;
            _unitOfWork.Repository<PrayerRequest>().Update(request);
            await _unitOfWork.SaveChangesAsync();
        }
        return Ok(ApiResponse.SuccessResponse("Prayer recorded 🙏"));
    }
}
