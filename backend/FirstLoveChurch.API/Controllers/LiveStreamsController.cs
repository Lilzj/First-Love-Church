using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.LiveStream;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Hubs;
using FirstLoveChurch.API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class LiveStreamsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IHubContext<NotificationHub> _hubContext;
    public LiveStreamsController(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<NotificationHub> hubContext) { _unitOfWork = unitOfWork; _mapper = mapper; _hubContext = hubContext; }

    [HttpGet]
    public async Task<IActionResult> GetStreams([FromQuery] PaginationParams p)
    {
        var result = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().GetPagedAsync(p, orderBy: q => q.OrderByDescending(s => s.ScheduledAt));
        var mapped = new PagedResult<LiveStreamResponseDto> { Items = _mapper.Map<IReadOnlyList<LiveStreamResponseDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<LiveStreamResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet("upcoming")]
    public async Task<IActionResult> GetUpcoming()
    {
        var streams = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().FindAsync(s => s.Status == "Scheduled" && s.ScheduledAt > DateTime.UtcNow);
        return Ok(ApiResponse<IReadOnlyList<LiveStreamResponseDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<LiveStreamResponseDto>>(streams)));
    }

    [HttpGet("live")]
    public async Task<IActionResult> GetLive()
    {
        var streams = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().FindAsync(s => s.Status == "Live");
        return Ok(ApiResponse<IReadOnlyList<LiveStreamResponseDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<LiveStreamResponseDto>>(streams)));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStream(Guid id)
    {
        var stream = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().GetByIdAsync(id);
        if (stream == null) return NotFound(ApiResponse.FailResponse("Stream not found"));
        return Ok(ApiResponse<LiveStreamResponseDto>.SuccessResponse(_mapper.Map<LiveStreamResponseDto>(stream)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> CreateStream([FromBody] CreateLiveStreamDto dto)
    {
        var stream = _mapper.Map<Models.LiveStream.LiveStream>(dto);
        stream.Slug = SlugHelper.GenerateSlug(dto.Title);
        await _unitOfWork.Repository<Models.LiveStream.LiveStream>().AddAsync(stream);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<LiveStreamResponseDto>.SuccessResponse(_mapper.Map<LiveStreamResponseDto>(stream), "Stream created", 201));
    }

    [HttpPost("{id}/start")]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> StartStream(Guid id)
    {
        var stream = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().GetByIdAsync(id);
        if (stream == null) return NotFound(ApiResponse.FailResponse("Stream not found"));
        stream.Status = "Live";
        stream.StartedAt = DateTime.UtcNow;
        _unitOfWork.Repository<Models.LiveStream.LiveStream>().Update(stream);
        await _unitOfWork.SaveChangesAsync();

        // Send real-time notification
        await _hubContext.Clients.All.SendAsync("LiveStreamStarted", _mapper.Map<LiveStreamResponseDto>(stream));

        return Ok(ApiResponse.SuccessResponse("Stream started"));
    }

    [HttpPost("{id}/end")]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> EndStream(Guid id)
    {
        var stream = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().GetByIdAsync(id);
        if (stream == null) return NotFound(ApiResponse.FailResponse("Stream not found"));
        stream.Status = "Ended";
        stream.EndedAt = DateTime.UtcNow;
        _unitOfWork.Repository<Models.LiveStream.LiveStream>().Update(stream);
        await _unitOfWork.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("LiveStreamEnded", stream.Id);
        return Ok(ApiResponse.SuccessResponse("Stream ended"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteStream(Guid id)
    {
        var stream = await _unitOfWork.Repository<Models.LiveStream.LiveStream>().GetByIdAsync(id);
        if (stream == null) return NotFound(ApiResponse.FailResponse("Stream not found"));
        _unitOfWork.Repository<Models.LiveStream.LiveStream>().Delete(stream);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Stream deleted"));
    }
}
