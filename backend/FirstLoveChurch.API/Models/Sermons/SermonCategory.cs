using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Sermons;

public class SermonCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Slug { get; set; }

    public ICollection<Sermon> Sermons { get; set; } = new List<Sermon>();
}
