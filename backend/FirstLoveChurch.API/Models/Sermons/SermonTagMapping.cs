namespace FirstLoveChurch.API.Models.Sermons;

public class SermonTagMapping
{
    public Guid SermonId { get; set; }
    public Sermon Sermon { get; set; } = null!;

    public Guid TagId { get; set; }
    public SermonTag Tag { get; set; } = null!;
}
