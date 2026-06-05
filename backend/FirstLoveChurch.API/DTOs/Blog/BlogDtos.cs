namespace FirstLoveChurch.API.DTOs.Blog;

public class CreateBlogPostDto
{
    public string Title { get; set; } = string.Empty;
    public string? Content { get; set; }
    public string? Excerpt { get; set; }
    public string? FeaturedImageUrl { get; set; }
    public string Status { get; set; } = "Draft";
    public bool IsFeatured { get; set; }
    public Guid? CategoryId { get; set; }
    public List<Guid>? TagIds { get; set; }
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
}

public class UpdateBlogPostDto
{
    public string? Title { get; set; }
    public string? Content { get; set; }
    public string? Excerpt { get; set; }
    public string? FeaturedImageUrl { get; set; }
    public string? Status { get; set; }
    public bool? IsFeatured { get; set; }
    public Guid? CategoryId { get; set; }
    public List<Guid>? TagIds { get; set; }
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
}

public class BlogPostResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Content { get; set; }
    public string? Excerpt { get; set; }
    public string? FeaturedImageUrl { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime? PublishedAt { get; set; }
    public int ViewCount { get; set; }
    public bool IsFeatured { get; set; }
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public string? AuthorImageUrl { get; set; }
    public string? CategoryName { get; set; }
    public List<string> Tags { get; set; } = new();
    public int CommentCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class BlogPostListDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? FeaturedImageUrl { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime? PublishedAt { get; set; }
    public int ViewCount { get; set; }
    public bool IsFeatured { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public string? CategoryName { get; set; }
    public int CommentCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class BlogCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Description { get; set; }
    public int PostCount { get; set; }
}

public class CreateBlogCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class BlogTagDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }
}

public class CreateBlogTagDto
{
    public string Name { get; set; } = string.Empty;
}

public class BlogCommentDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? AuthorName { get; set; }
    public string? UserImageUrl { get; set; }
    public bool IsApproved { get; set; }
    public Guid? ParentCommentId { get; set; }
    public List<BlogCommentDto> Replies { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class CreateBlogCommentDto
{
    public string Content { get; set; } = string.Empty;
    public string? AuthorName { get; set; }
    public string? AuthorEmail { get; set; }
    public Guid? ParentCommentId { get; set; }
}
