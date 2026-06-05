using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Media;

public class MediaFile : BaseEntity
{
    public string FileName { get; set; } = string.Empty;
    public string OriginalFileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty; // Image, Video, Audio, Document
    public long FileSize { get; set; }
    public string? MimeType { get; set; }
    public string? Description { get; set; }
    public string? Tags { get; set; }
    public string? AltText { get; set; }

    public Guid? AlbumId { get; set; }
    public Album? Album { get; set; }

    public string? UploadedById { get; set; }
    public ApplicationUser? UploadedBy { get; set; }
}
