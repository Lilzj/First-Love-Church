using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Sermons;

public class SermonComment : BaseEntity
{
    public string Content { get; set; } = string.Empty;

    public Guid SermonId { get; set; }
    public Sermon Sermon { get; set; } = null!;

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }

    public Guid? ParentCommentId { get; set; }
    public SermonComment? ParentComment { get; set; }

    public ICollection<SermonComment> Replies { get; set; } = new List<SermonComment>();
}
