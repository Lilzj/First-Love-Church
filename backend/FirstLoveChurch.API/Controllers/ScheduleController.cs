using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Schedule;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Schedule;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ScheduleController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public ScheduleController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetActivities()
    {
        var activities = await _unitOfWork.Repository<WeeklyActivity>().FindAsync(a => a.IsActive);
        var ordered = activities.OrderBy(a => a.DayOfWeek).ThenBy(a => a.SortOrder).ToList();
        return Ok(ApiResponse<List<WeeklyActivityResponseDto>>.SuccessResponse(_mapper.Map<List<WeeklyActivityResponseDto>>(ordered)));
    }

    [HttpGet("by-day/{day}")]
    public async Task<IActionResult> GetByDay(DayOfWeek day)
    {
        var activities = await _unitOfWork.Repository<WeeklyActivity>().FindAsync(a => a.DayOfWeek == day && a.IsActive);
        var ordered = activities.OrderBy(a => a.SortOrder).ToList();
        return Ok(ApiResponse<List<WeeklyActivityResponseDto>>.SuccessResponse(_mapper.Map<List<WeeklyActivityResponseDto>>(ordered)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> CreateActivity([FromBody] CreateWeeklyActivityDto dto)
    {
        var activity = _mapper.Map<WeeklyActivity>(dto);
        await _unitOfWork.Repository<WeeklyActivity>().AddAsync(activity);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<WeeklyActivityResponseDto>.SuccessResponse(_mapper.Map<WeeklyActivityResponseDto>(activity), "Activity created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> UpdateActivity(Guid id, [FromBody] UpdateWeeklyActivityDto dto)
    {
        var activity = await _unitOfWork.Repository<WeeklyActivity>().GetByIdAsync(id);
        if (activity == null) return NotFound(ApiResponse.FailResponse("Activity not found"));
        _mapper.Map(dto, activity);
        _unitOfWork.Repository<WeeklyActivity>().Update(activity);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<WeeklyActivityResponseDto>.SuccessResponse(_mapper.Map<WeeklyActivityResponseDto>(activity), "Activity updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
        var activity = await _unitOfWork.Repository<WeeklyActivity>().GetByIdAsync(id);
        if (activity == null) return NotFound(ApiResponse.FailResponse("Activity not found"));
        _unitOfWork.Repository<WeeklyActivity>().Delete(activity);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Activity deleted"));
    }
}
