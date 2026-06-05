namespace FirstLoveChurch.API.DTOs.Media;

public class MediaFileResponseDto
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string? MimeType { get; set; }
    public string? Description { get; set; }
    public string? Tags { get; set; }
    public string? AltText { get; set; }
    public Guid? AlbumId { get; set; }
    public string? AlbumTitle { get; set; }
    public string? UploadedByName { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class MediaUploadResponseDto
{
    public Guid Id { get; set; }
    public string FileUrl { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public long FileSize { get; set; }
}

public class CreateAlbumDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    public Guid? EventId { get; set; }
    public Guid? MinistryId { get; set; }
}

public class UpdateAlbumDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
}

public class AlbumResponseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? Slug { get; set; }
    public Guid? EventId { get; set; }
    public Guid? MinistryId { get; set; }
    public int MediaCount { get; set; }
    public DateTime CreatedAt { get; set; }
}
