using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Sermons;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Sermons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class SermonsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public SermonsController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetSermons([FromQuery] PaginationParams paginationParams, [FromQuery] Guid? categoryId, [FromQuery] bool? featured)
    {
        System.Linq.Expressions.Expression<Func<Sermon, bool>>? filter = null;

        if (categoryId.HasValue && featured.HasValue)
            filter = s => s.CategoryId == categoryId && s.IsFeatured == featured;
        else if (categoryId.HasValue)
            filter = s => s.CategoryId == categoryId;
        else if (featured.HasValue)
            filter = s => s.IsFeatured == featured;

        var result = await _unitOfWork.Repository<Sermon>().GetPagedAsync(
            paginationParams, filter, includeProperties: "Category,Speaker,TagMappings.Tag,Comments");

        var mapped = new PagedResult<SermonListDto>
        {
            Items = _mapper.Map<IReadOnlyList<SermonListDto>>(result.Items),
            TotalCount = result.TotalCount,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };

        return Ok(ApiResponse<PagedResult<SermonListDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSermon(Guid id)
    {
        var sermon = await _unitOfWork.Repository<Sermon>().GetByIdAsync(id,
            "Category,Series,Speaker,TagMappings.Tag,Comments.User");
        if (sermon == null)
            return NotFound(ApiResponse.FailResponse("Sermon not found"));

        // Increment view count
        sermon.ViewCount++;
        _unitOfWork.Repository<Sermon>().Update(sermon);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse<SermonResponseDto>.SuccessResponse(_mapper.Map<SermonResponseDto>(sermon)));
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedSermons()
    {
        var sermons = await _unitOfWork.Repository<Sermon>().FindAsync(
            s => s.IsFeatured, "Category,Speaker");
        return Ok(ApiResponse<IReadOnlyList<SermonListDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<SermonListDto>>(sermons)));
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchSermons([FromQuery] string q, [FromQuery] PaginationParams paginationParams)
    {
        var search = q?.ToLower() ?? "";
        var result = await _unitOfWork.Repository<Sermon>().GetPagedAsync(paginationParams,
            s => s.Title.ToLower().Contains(search) || (s.Description != null && s.Description.ToLower().Contains(search)),
            includeProperties: "Category,Speaker");

        var mapped = new PagedResult<SermonListDto>
        {
            Items = _mapper.Map<IReadOnlyList<SermonListDto>>(result.Items),
            TotalCount = result.TotalCount,
            PageNumber = result.PageNumber,
            PageSize = result.PageSize
        };

        return Ok(ApiResponse<PagedResult<SermonListDto>>.SuccessResponse(mapped));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateSermon([FromBody] CreateSermonDto dto)
    {
        var sermon = _mapper.Map<Sermon>(dto);
        sermon.Slug = SlugHelper.GenerateSlug(dto.Title);
        sermon.SpeakerId ??= User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        await _unitOfWork.Repository<Sermon>().AddAsync(sermon);

        // Add tags
        if (dto.TagIds?.Any() == true)
        {
            foreach (var tagId in dto.TagIds)
            {
                sermon.TagMappings.Add(new SermonTagMapping { SermonId = sermon.Id, TagId = tagId });
            }
        }

        await _unitOfWork.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSermon), new { id = sermon.Id },
            ApiResponse<SermonResponseDto>.SuccessResponse(_mapper.Map<SermonResponseDto>(sermon), "Sermon created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> UpdateSermon(Guid id, [FromBody] UpdateSermonDto dto)
    {
        var sermon = await _unitOfWork.Repository<Sermon>().GetByIdAsync(id, "TagMappings");
        if (sermon == null)
            return NotFound(ApiResponse.FailResponse("Sermon not found"));

        _mapper.Map(dto, sermon);
        if (dto.Title != null)
            sermon.Slug = SlugHelper.GenerateSlug(dto.Title);

        _unitOfWork.Repository<Sermon>().Update(sermon);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse<SermonResponseDto>.SuccessResponse(_mapper.Map<SermonResponseDto>(sermon), "Sermon updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteSermon(Guid id)
    {
        var sermon = await _unitOfWork.Repository<Sermon>().GetByIdAsync(id);
        if (sermon == null)
            return NotFound(ApiResponse.FailResponse("Sermon not found"));

        _unitOfWork.Repository<Sermon>().Delete(sermon);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse.SuccessResponse("Sermon deleted"));
    }

    [HttpPost("{id}/like")]
    [Authorize]
    public async Task<IActionResult> LikeSermon(Guid id)
    {
        var sermon = await _unitOfWork.Repository<Sermon>().GetByIdAsync(id);
        if (sermon == null)
            return NotFound(ApiResponse.FailResponse("Sermon not found"));

        sermon.LikeCount++;
        _unitOfWork.Repository<Sermon>().Update(sermon);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse.SuccessResponse("Sermon liked"));
    }

    [HttpPost("{id}/comments")]
    [Authorize]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] CreateSermonCommentDto dto)
    {
        if (!await _unitOfWork.Repository<Sermon>().ExistsAsync(id))
            return NotFound(ApiResponse.FailResponse("Sermon not found"));

        var comment = _mapper.Map<SermonComment>(dto);
        comment.SermonId = id;
        comment.UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        await _unitOfWork.Repository<SermonComment>().AddAsync(comment);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse<SermonCommentDto>.SuccessResponse(_mapper.Map<SermonCommentDto>(comment), "Comment added", 201));
    }

    [HttpGet("{id}/comments")]
    public async Task<IActionResult> GetComments(Guid id)
    {
        var comments = await _unitOfWork.Repository<SermonComment>().FindAsync(
            c => c.SermonId == id && c.ParentCommentId == null, "User,Replies.User");
        return Ok(ApiResponse<IReadOnlyList<SermonCommentDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<SermonCommentDto>>(comments)));
    }
}
