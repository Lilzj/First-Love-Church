using AutoMapper;
using FirstLoveChurch.API.DTOs.Auth;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class UsersController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;

    public UsersController(UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _userManager = userManager;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> GetUsers([FromQuery] PaginationParams paginationParams)
    {
        var query = _userManager.Users.Where(u => !u.IsDeleted);

        if (!string.IsNullOrWhiteSpace(paginationParams.SearchTerm))
        {
            var search = paginationParams.SearchTerm.ToLower();
            query = query.Where(u =>
                u.FirstName.ToLower().Contains(search) ||
                u.LastName.ToLower().Contains(search) ||
                u.Email!.ToLower().Contains(search));
        }

        var totalCount = await query.CountAsync();
        var users = await query
            .OrderByDescending(u => u.CreatedAt)
            .Skip((paginationParams.PageNumber - 1) * paginationParams.PageSize)
            .Take(paginationParams.PageSize)
            .ToListAsync();

        var userDtos = new List<UserProfileDto>();
        foreach (var user in users)
        {
            var dto = _mapper.Map<UserProfileDto>(user);
            dto.Roles = await _userManager.GetRolesAsync(user);
            userDtos.Add(dto);
        }

        var result = new PagedResult<UserProfileDto>
        {
            Items = userDtos,
            TotalCount = totalCount,
            PageNumber = paginationParams.PageNumber,
            PageSize = paginationParams.PageSize
        };

        return Ok(ApiResponse<PagedResult<UserProfileDto>>.SuccessResponse(result));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null || user.IsDeleted)
            return NotFound(ApiResponse.FailResponse("User not found"));

        var dto = _mapper.Map<UserProfileDto>(user);
        dto.Roles = await _userManager.GetRolesAsync(user);

        return Ok(ApiResponse<UserProfileDto>.SuccessResponse(dto));
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound(ApiResponse.FailResponse("User not found"));

        var dto = _mapper.Map<UserProfileDto>(user);
        dto.Roles = await _userManager.GetRolesAsync(user);

        return Ok(ApiResponse<UserProfileDto>.SuccessResponse(dto));
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
            return NotFound(ApiResponse.FailResponse("User not found"));

        _mapper.Map(dto, user);
        user.UpdatedAt = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);

        var result = _mapper.Map<UserProfileDto>(user);
        result.Roles = await _userManager.GetRolesAsync(user);

        return Ok(ApiResponse<UserProfileDto>.SuccessResponse(result, "Profile updated"));
    }

    [HttpPost("assign-role")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto dto)
    {
        var user = await _userManager.FindByIdAsync(dto.UserId);
        if (user == null)
            return NotFound(ApiResponse.FailResponse("User not found"));

        if (!await _userManager.IsInRoleAsync(user, dto.RoleName))
        {
            var result = await _userManager.AddToRoleAsync(user, dto.RoleName);
            if (!result.Succeeded)
                return BadRequest(ApiResponse.FailResponse(string.Join(", ", result.Errors.Select(e => e.Description))));
        }

        return Ok(ApiResponse.SuccessResponse($"Role '{dto.RoleName}' assigned to user"));
    }

    [HttpPost("remove-role")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> RemoveRole([FromBody] AssignRoleDto dto)
    {
        var user = await _userManager.FindByIdAsync(dto.UserId);
        if (user == null)
            return NotFound(ApiResponse.FailResponse("User not found"));

        var result = await _userManager.RemoveFromRoleAsync(user, dto.RoleName);
        if (!result.Succeeded)
            return BadRequest(ApiResponse.FailResponse(string.Join(", ", result.Errors.Select(e => e.Description))));

        return Ok(ApiResponse.SuccessResponse($"Role '{dto.RoleName}' removed from user"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeactivateUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
            return NotFound(ApiResponse.FailResponse("User not found"));

        user.IsActive = false;
        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);

        return Ok(ApiResponse.SuccessResponse("User deactivated"));
    }
}
