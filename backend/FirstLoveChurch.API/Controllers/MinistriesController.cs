using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Ministry;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Ministry;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class MinistriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public MinistriesController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetMinistries([FromQuery] PaginationParams p)
    {
        var result = await _unitOfWork.Repository<Ministry>().GetPagedAsync(p, includeProperties: "Leaders.User,Members");
        var mapped = new PagedResult<MinistryListDto> { Items = _mapper.Map<IReadOnlyList<MinistryListDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<MinistryListDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetMinistry(Guid id)
    {
        var ministry = await _unitOfWork.Repository<Ministry>().GetByIdAsync(id, "Leaders.User,Members.User");
        if (ministry == null) return NotFound(ApiResponse.FailResponse("Ministry not found"));
        return Ok(ApiResponse<MinistryResponseDto>.SuccessResponse(_mapper.Map<MinistryResponseDto>(ministry)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> CreateMinistry([FromBody] CreateMinistryDto dto)
    {
        var ministry = _mapper.Map<Ministry>(dto);
        ministry.Slug = SlugHelper.GenerateSlug(dto.Name);
        await _unitOfWork.Repository<Ministry>().AddAsync(ministry);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<MinistryResponseDto>.SuccessResponse(_mapper.Map<MinistryResponseDto>(ministry), "Ministry created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> UpdateMinistry(Guid id, [FromBody] UpdateMinistryDto dto)
    {
        var ministry = await _unitOfWork.Repository<Ministry>().GetByIdAsync(id);
        if (ministry == null) return NotFound(ApiResponse.FailResponse("Ministry not found"));
        _mapper.Map(dto, ministry);
        _unitOfWork.Repository<Ministry>().Update(ministry);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<MinistryResponseDto>.SuccessResponse(_mapper.Map<MinistryResponseDto>(ministry), "Ministry updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteMinistry(Guid id)
    {
        var ministry = await _unitOfWork.Repository<Ministry>().GetByIdAsync(id);
        if (ministry == null) return NotFound(ApiResponse.FailResponse("Ministry not found"));
        _unitOfWork.Repository<Ministry>().Delete(ministry);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Ministry deleted"));
    }

    [HttpPost("{id}/leaders")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> AddLeader(Guid id, [FromBody] AddMinistryLeaderDto dto)
    {
        if (!await _unitOfWork.Repository<Ministry>().ExistsAsync(id)) return NotFound(ApiResponse.FailResponse("Ministry not found"));
        var leader = new MinistryLeader { MinistryId = id, UserId = dto.UserId, Role = dto.Role };
        await _unitOfWork.Repository<MinistryLeader>().AddAsync(leader);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Leader added"));
    }

    [HttpPost("{id}/members")]
    [Authorize]
    public async Task<IActionResult> AddMember(Guid id, [FromBody] AddMinistryMemberDto dto)
    {
        if (!await _unitOfWork.Repository<Ministry>().ExistsAsync(id)) return NotFound(ApiResponse.FailResponse("Ministry not found"));
        var member = new MinistryMember { MinistryId = id, UserId = dto.UserId };
        await _unitOfWork.Repository<MinistryMember>().AddAsync(member);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Member added"));
    }

    [HttpGet("{id}/members")]
    public async Task<IActionResult> GetMembers(Guid id)
    {
        var members = await _unitOfWork.Repository<MinistryMember>().FindAsync(m => m.MinistryId == id, "User");
        return Ok(ApiResponse<IReadOnlyList<MinistryMemberDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<MinistryMemberDto>>(members)));
    }
}
