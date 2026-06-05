namespace FirstLoveChurch.API.Models.Blog;

public class BlogTagMapping
{
    public Guid PostId { get; set; }
    public BlogPost Post { get; set; } = null!;

    public Guid TagId { get; set; }
    public BlogTag Tag { get; set; } = null!;
}
