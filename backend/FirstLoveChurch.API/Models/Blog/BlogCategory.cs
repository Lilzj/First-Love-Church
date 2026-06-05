using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Blog;

public class BlogCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public string? Description { get; set; }

    public ICollection<BlogPost> Posts { get; set; } = new List<BlogPost>();
}
