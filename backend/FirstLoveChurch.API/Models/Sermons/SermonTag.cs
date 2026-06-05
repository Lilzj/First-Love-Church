using FirstLoveChurch.API.Models.Common;

namespace FirstLoveChurch.API.Models.Sermons;

public class SermonTag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Slug { get; set; }

    public ICollection<SermonTagMapping> TagMappings { get; set; } = new List<SermonTagMapping>();
}
