using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Media;

public class Album : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? CoverImageUrl { get; set; }
    public string? Slug { get; set; }

    public Guid? EventId { get; set; }
    public Guid? MinistryId { get; set; }

    public ICollection<MediaFile> MediaFiles { get; set; } = new List<MediaFile>();
}
