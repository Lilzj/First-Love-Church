namespace FirstLoveChurch.API.DTOs.Sermons;

public class CreateSermonDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Content { get; set; }
    public string? VideoUrl { get; set; }
    public string? AudioUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string? ScriptureReferences { get; set; }
    public bool IsFeatured { get; set; }
    public Guid? SeriesId { get; set; }
    public Guid? CategoryId { get; set; }
    public string? SpeakerId { get; set; }
    public List<Guid>? TagIds { get; set; }
}

public class UpdateSermonDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Content { get; set; }
    public string? VideoUrl { get; set; }
    public string? AudioUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string? ScriptureReferences { get; set; }
    public bool? IsFeatured { get; set; }
    public Guid? SeriesId { get; set; }
    public Guid? CategoryId { get; set; }
    public string? SpeakerId { get; set; }
    public List<Guid>? TagIds { get; set; }
}

public class SermonResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Content { get; set; }
    public string? VideoUrl { get; set; }
    public string? AudioUrl { get; set; }
    public string? ImageUrl { get; set; }
    public string? ScriptureReferences { get; set; }
    public bool IsFeatured { get; set; }
    public int ViewCount { get; set; }
    public int LikeCount { get; set; }
    public string? Slug { get; set; }
    public string? SeriesName { get; set; }
    public string? CategoryName { get; set; }
    public string? SpeakerName { get; set; }
    public string? SpeakerImageUrl { get; set; }
    public List<string> Tags { get; set; } = new();
    public int CommentCount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

public class SermonListDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public bool IsFeatured { get; set; }
    public int ViewCount { get; set; }
    public string? Slug { get; set; }
    public string? CategoryName { get; set; }
    public string? SpeakerName { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class SermonCategoryDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Slug { get; set; }
    public int SermonCount { get; set; }
}

public class CreateSermonCategoryDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class SermonTagDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }
}

public class CreateSermonTagDto
{
    public string Name { get; set; } = string.Empty;
}

public class SermonSeriesDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? Slug { get; set; }
    public int SermonCount { get; set; }
}

public class CreateSermonSeriesDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
}

public class SermonCommentDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? UserName { get; set; }
    public string? UserImageUrl { get; set; }
    public Guid? ParentCommentId { get; set; }
    public List<SermonCommentDto> Replies { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class CreateSermonCommentDto
{
    public string Content { get; set; } = string.Empty;
    public Guid? ParentCommentId { get; set; }
}
