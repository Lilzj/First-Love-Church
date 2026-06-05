using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Notifications;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Notifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public NotificationsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetNotifications([FromQuery] PaginationParams p)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var result = await _unitOfWork.Repository<Notification>().GetPagedAsync(p, n => n.UserId == userId);
        var mapped = new PagedResult<NotificationResponseDto> { Items = _mapper.Map<IReadOnlyList<NotificationResponseDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<NotificationResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet("unread")]
    public async Task<IActionResult> GetUnread()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var notifications = await _unitOfWork.Repository<Notification>().FindAsync(n => n.UserId == userId && !n.IsRead);
        return Ok(ApiResponse<IReadOnlyList<NotificationResponseDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<NotificationResponseDto>>(notifications)));
    }

    [HttpGet("unread-count")]
    public async Task<IActionResult> GetUnreadCount()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var count = await _unitOfWork.Repository<Notification>().CountAsync(n => n.UserId == userId && !n.IsRead);
        return Ok(ApiResponse<int>.SuccessResponse(count));
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        var notification = await _unitOfWork.Repository<Notification>().GetByIdAsync(id);
        if (notification == null) return NotFound(ApiResponse.FailResponse("Notification not found"));
        notification.IsRead = true;
        notification.ReadAt = DateTime.UtcNow;
        _unitOfWork.Repository<Notification>().Update(notification);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Marked as read"));
    }

    [HttpPut("read-all")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var unread = await _unitOfWork.Repository<Notification>().FindAsync(n => n.UserId == userId && !n.IsRead);
        foreach (var n in unread)
        {
            n.IsRead = true;
            n.ReadAt = DateTime.UtcNow;
            _unitOfWork.Repository<Notification>().Update(n);
        }
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("All notifications marked as read"));
    }
}
