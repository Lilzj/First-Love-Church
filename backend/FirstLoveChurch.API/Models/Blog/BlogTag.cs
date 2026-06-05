using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Blog;

public class BlogTag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }

    public ICollection<BlogTagMapping> TagMappings { get; set; } = new List<BlogTagMapping>();
}
