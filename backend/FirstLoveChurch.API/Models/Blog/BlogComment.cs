using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;

namespace FirstLoveChurch.API.Models.Blog;

public class BlogComment : BaseEntity
{
    public string Content { get; set; } = string.Empty;
    public string? AuthorName { get; set; }
    public string? AuthorEmail { get; set; }
    public bool IsApproved { get; set; }

    public Guid PostId { get; set; }
    public BlogPost Post { get; set; } = null!;

    public string? UserId { get; set; }
    public ApplicationUser? User { get; set; }

    public Guid? ParentCommentId { get; set; }
    public BlogComment? ParentComment { get; set; }

    public ICollection<BlogComment> Replies { get; set; } = new List<BlogComment>();
}
