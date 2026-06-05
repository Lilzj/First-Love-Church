using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Sermons;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Sermons;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/sermon-categories")]
public class SermonCategoriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public SermonCategoriesController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _unitOfWork.Repository<SermonCategory>().GetAllAsync("Sermons");
        return Ok(ApiResponse<IReadOnlyList<SermonCategoryDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<SermonCategoryDto>>(categories)));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(Guid id)
    {
        var category = await _unitOfWork.Repository<SermonCategory>().GetByIdAsync(id, "Sermons");
        if (category == null) return NotFound(ApiResponse.FailResponse("Category not found"));
        return Ok(ApiResponse<SermonCategoryDto>.SuccessResponse(_mapper.Map<SermonCategoryDto>(category)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateCategory([FromBody] CreateSermonCategoryDto dto)
    {
        var category = _mapper.Map<SermonCategory>(dto);
        category.Slug = SlugHelper.GenerateSlug(dto.Name);
        await _unitOfWork.Repository<SermonCategory>().AddAsync(category);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<SermonCategoryDto>.SuccessResponse(_mapper.Map<SermonCategoryDto>(category), "Category created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] CreateSermonCategoryDto dto)
    {
        var category = await _unitOfWork.Repository<SermonCategory>().GetByIdAsync(id);
        if (category == null) return NotFound(ApiResponse.FailResponse("Category not found"));
        category.Name = dto.Name;
        category.Description = dto.Description;
        category.Slug = SlugHelper.GenerateSlug(dto.Name);
        _unitOfWork.Repository<SermonCategory>().Update(category);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<SermonCategoryDto>.SuccessResponse(_mapper.Map<SermonCategoryDto>(category), "Category updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        var category = await _unitOfWork.Repository<SermonCategory>().GetByIdAsync(id);
        if (category == null) return NotFound(ApiResponse.FailResponse("Category not found"));
        _unitOfWork.Repository<SermonCategory>().Delete(category);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Category deleted"));
    }
}

[ApiController]
[Route("api/v1/sermon-tags")]
public class SermonTagsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public SermonTagsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetTags()
    {
        var tags = await _unitOfWork.Repository<SermonTag>().GetAllAsync();
        return Ok(ApiResponse<IReadOnlyList<SermonTagDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<SermonTagDto>>(tags)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateTag([FromBody] CreateSermonTagDto dto)
    {
        var tag = _mapper.Map<SermonTag>(dto);
        tag.Slug = SlugHelper.GenerateSlug(dto.Name);
        await _unitOfWork.Repository<SermonTag>().AddAsync(tag);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<SermonTagDto>.SuccessResponse(_mapper.Map<SermonTagDto>(tag), "Tag created", 201));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteTag(Guid id)
    {
        var tag = await _unitOfWork.Repository<SermonTag>().GetByIdAsync(id);
        if (tag == null) return NotFound(ApiResponse.FailResponse("Tag not found"));
        _unitOfWork.Repository<SermonTag>().Delete(tag);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Tag deleted"));
    }
}

[ApiController]
[Route("api/v1/sermon-series")]
public class SermonSeriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public SermonSeriesController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetSeries()
    {
        var series = await _unitOfWork.Repository<SermonSeries>().GetAllAsync("Sermons");
        return Ok(ApiResponse<IReadOnlyList<SermonSeriesDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<SermonSeriesDto>>(series)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateSeries([FromBody] CreateSermonSeriesDto dto)
    {
        var s = _mapper.Map<SermonSeries>(dto);
        s.Slug = SlugHelper.GenerateSlug(dto.Title);
        await _unitOfWork.Repository<SermonSeries>().AddAsync(s);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<SermonSeriesDto>.SuccessResponse(_mapper.Map<SermonSeriesDto>(s), "Series created", 201));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteSeries(Guid id)
    {
        var s = await _unitOfWork.Repository<SermonSeries>().GetByIdAsync(id);
        if (s == null) return NotFound(ApiResponse.FailResponse("Series not found"));
        _unitOfWork.Repository<SermonSeries>().Delete(s);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Series deleted"));
    }
}

[ApiController]
[Route("api/v1/blog-tags")]
public class BlogTagsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public BlogTagsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetTags()
    {
        var tags = await _unitOfWork.Repository<Models.Blog.BlogTag>().GetAllAsync();
        return Ok(ApiResponse<IReadOnlyList<DTOs.Blog.BlogTagDto>>.SuccessResponse(
            _mapper.Map<IReadOnlyList<DTOs.Blog.BlogTagDto>>(tags)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateTag([FromBody] DTOs.Blog.CreateBlogTagDto dto)
    {
        var tag = _mapper.Map<Models.Blog.BlogTag>(dto);
        tag.Slug = SlugHelper.GenerateSlug(dto.Name);
        await _unitOfWork.Repository<Models.Blog.BlogTag>().AddAsync(tag);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<DTOs.Blog.BlogTagDto>.SuccessResponse(_mapper.Map<DTOs.Blog.BlogTagDto>(tag), "Tag created", 201));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteTag(Guid id)
    {
        var tag = await _unitOfWork.Repository<Models.Blog.BlogTag>().GetByIdAsync(id);
        if (tag == null) return NotFound(ApiResponse.FailResponse("Tag not found"));
        _unitOfWork.Repository<Models.Blog.BlogTag>().Delete(tag);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Tag deleted"));
    }
}
