using AutoMapper;
using FirstLoveChurch.API.DTOs.Blog;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Blog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/blog")]
public class BlogPostsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public BlogPostsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetPosts([FromQuery] PaginationParams p, [FromQuery] Guid? categoryId, [FromQuery] string? status)
    {
        System.Linq.Expressions.Expression<Func<BlogPost, bool>>? filter = null;
        if (categoryId.HasValue && !string.IsNullOrEmpty(status))
            filter = b => b.CategoryId == categoryId && b.Status == status;
        else if (categoryId.HasValue)
            filter = b => b.CategoryId == categoryId && b.Status == "Published";
        else if (!string.IsNullOrEmpty(status))
            filter = b => b.Status == status;
        else
            filter = b => b.Status == "Published";

        var result = await _unitOfWork.Repository<BlogPost>().GetPagedAsync(p, filter,
            q => q.OrderByDescending(b => b.PublishedAt ?? b.CreatedAt), "Author,Category,TagMappings.Tag,Comments");
        var mapped = new PagedResult<BlogPostListDto> { Items = _mapper.Map<IReadOnlyList<BlogPostListDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<BlogPostListDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{idOrSlug}")]
    public async Task<IActionResult> GetPost(string idOrSlug)
    {
        BlogPost? post;
        if (Guid.TryParse(idOrSlug, out var id))
            post = await _unitOfWork.Repository<BlogPost>().GetByIdAsync(id, "Author,Category,TagMappings.Tag,Comments.User");
        else
            post = await _unitOfWork.Repository<BlogPost>().FirstOrDefaultAsync(b => b.Slug == idOrSlug, "Author,Category,TagMappings.Tag,Comments.User");

        if (post == null) return NotFound(ApiResponse.FailResponse("Post not found"));

        post.ViewCount++;
        _unitOfWork.Repository<BlogPost>().Update(post);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse<BlogPostResponseDto>.SuccessResponse(_mapper.Map<BlogPostResponseDto>(post)));
    }

    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedPosts()
    {
        var posts = await _unitOfWork.Repository<BlogPost>().FindAsync(b => b.IsFeatured && b.Status == "Published", "Author,Category");
        return Ok(ApiResponse<IReadOnlyList<BlogPostListDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<BlogPostListDto>>(posts)));
    }

    [HttpGet("drafts")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> GetDrafts([FromQuery] PaginationParams p)
    {
        var result = await _unitOfWork.Repository<BlogPost>().GetPagedAsync(p, b => b.Status == "Draft", includeProperties: "Author,Category");
        var mapped = new PagedResult<BlogPostListDto> { Items = _mapper.Map<IReadOnlyList<BlogPostListDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<BlogPostListDto>>.SuccessResponse(mapped));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreatePost([FromBody] CreateBlogPostDto dto)
    {
        var post = _mapper.Map<BlogPost>(dto);
        post.Slug = SlugHelper.GenerateSlug(dto.Title);
        post.AuthorId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        if (dto.Status == "Published") post.PublishedAt = DateTime.UtcNow;
        await _unitOfWork.Repository<BlogPost>().AddAsync(post);

        if (dto.TagIds?.Any() == true)
            foreach (var tagId in dto.TagIds)
                post.TagMappings.Add(new BlogTagMapping { PostId = post.Id, TagId = tagId });

        await _unitOfWork.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPost), new { idOrSlug = post.Id.ToString() },
            ApiResponse<BlogPostResponseDto>.SuccessResponse(_mapper.Map<BlogPostResponseDto>(post), "Post created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdateBlogPostDto dto)
    {
        var post = await _unitOfWork.Repository<BlogPost>().GetByIdAsync(id, "TagMappings");
        if (post == null) return NotFound(ApiResponse.FailResponse("Post not found"));
        _mapper.Map(dto, post);
        if (dto.Title != null) post.Slug = SlugHelper.GenerateSlug(dto.Title);
        if (dto.Status == "Published" && post.PublishedAt == null) post.PublishedAt = DateTime.UtcNow;
        _unitOfWork.Repository<BlogPost>().Update(post);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<BlogPostResponseDto>.SuccessResponse(_mapper.Map<BlogPostResponseDto>(post), "Post updated"));
    }

    [HttpPost("{id}/publish")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> PublishPost(Guid id)
    {
        var post = await _unitOfWork.Repository<BlogPost>().GetByIdAsync(id);
        if (post == null) return NotFound(ApiResponse.FailResponse("Post not found"));
        post.Status = "Published";
        post.PublishedAt = DateTime.UtcNow;
        _unitOfWork.Repository<BlogPost>().Update(post);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Post published"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeletePost(Guid id)
    {
        var post = await _unitOfWork.Repository<BlogPost>().GetByIdAsync(id);
        if (post == null) return NotFound(ApiResponse.FailResponse("Post not found"));
        _unitOfWork.Repository<BlogPost>().Delete(post);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Post deleted"));
    }

    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] CreateBlogCommentDto dto)
    {
        if (!await _unitOfWork.Repository<BlogPost>().ExistsAsync(id))
            return NotFound(ApiResponse.FailResponse("Post not found"));
        var comment = _mapper.Map<BlogComment>(dto);
        comment.PostId = id;
        comment.UserId = User.Identity?.IsAuthenticated == true ? User.FindFirst(ClaimTypes.NameIdentifier)?.Value : null;
        await _unitOfWork.Repository<BlogComment>().AddAsync(comment);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<BlogCommentDto>.SuccessResponse(_mapper.Map<BlogCommentDto>(comment), "Comment added"));
    }
}

[ApiController]
[Route("api/v1/blog-categories")]
public class BlogCategoriesController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public BlogCategoriesController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _unitOfWork.Repository<BlogCategory>().GetAllAsync("Posts");
        return Ok(ApiResponse<IReadOnlyList<BlogCategoryDto>>.SuccessResponse(_mapper.Map<IReadOnlyList<BlogCategoryDto>>(categories)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor")]
    public async Task<IActionResult> CreateCategory([FromBody] CreateBlogCategoryDto dto)
    {
        var category = _mapper.Map<BlogCategory>(dto);
        category.Slug = SlugHelper.GenerateSlug(dto.Name);
        await _unitOfWork.Repository<BlogCategory>().AddAsync(category);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<BlogCategoryDto>.SuccessResponse(_mapper.Map<BlogCategoryDto>(category), "Category created", 201));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        var category = await _unitOfWork.Repository<BlogCategory>().GetByIdAsync(id);
        if (category == null) return NotFound(ApiResponse.FailResponse("Category not found"));
        _unitOfWork.Repository<BlogCategory>().Delete(category);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Category deleted"));
    }
}
