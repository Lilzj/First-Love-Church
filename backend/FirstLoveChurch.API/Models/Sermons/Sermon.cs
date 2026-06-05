using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Sermons;

public class Sermon : BaseEntity
{
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

    public Guid? SeriesId { get; set; }
    public SermonSeries? Series { get; set; }

    public Guid? CategoryId { get; set; }
    public SermonCategory? Category { get; set; }

    public string? SpeakerId { get; set; }
    public ApplicationUser? Speaker { get; set; }

    public ICollection<SermonTagMapping> TagMappings { get; set; } = new List<SermonTagMapping>();
    public ICollection<SermonComment> Comments { get; set; } = new List<SermonComment>();
}
