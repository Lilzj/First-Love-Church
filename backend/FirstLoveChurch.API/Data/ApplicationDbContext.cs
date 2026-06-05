using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using FirstLoveChurch.API.Models;
using FirstLoveChurch.API.Models.Common;
using FirstLoveChurch.API.Models.Identity;
using FirstLoveChurch.API.Models.Sermons;
using FirstLoveChurch.API.Models.Events;
using FirstLoveChurch.API.Models.Donations;
using FirstLoveChurch.API.Models.Blog;
using FirstLoveChurch.API.Models.Media;
using FirstLoveChurch.API.Models.Ministry;
using FirstLoveChurch.API.Models.LiveStream;
using FirstLoveChurch.API.Models.PrayerRequests;
using FirstLoveChurch.API.Models.Schedule;
using FirstLoveChurch.API.Models.Notifications;

namespace FirstLoveChurch.API.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
{
    private readonly IHttpContextAccessor? _httpContextAccessor;

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options,
        IHttpContextAccessor? httpContextAccessor = null) : base(options)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    // Sermons
    public DbSet<Sermon> Sermons => Set<Sermon>();
    public DbSet<SermonSeries> SermonSeries => Set<SermonSeries>();
    public DbSet<SermonCategory> SermonCategories => Set<SermonCategory>();
    public DbSet<SermonTag> SermonTags => Set<SermonTag>();
    public DbSet<SermonTagMapping> SermonTagMappings => Set<SermonTagMapping>();
    public DbSet<SermonComment> SermonComments => Set<SermonComment>();

    // Events
    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventRegistration> EventRegistrations => Set<EventRegistration>();
    public DbSet<EventAttendance> EventAttendances => Set<EventAttendance>();
    public DbSet<VolunteerSignup> VolunteerSignups => Set<VolunteerSignup>();

    // Donations
    public DbSet<DonationCampaign> DonationCampaigns => Set<DonationCampaign>();
    public DbSet<Donation> Donations => Set<Donation>();
    public DbSet<ChurchProject> ChurchProjects => Set<ChurchProject>();
    public DbSet<Sponsor> Sponsors => Set<Sponsor>();
    public DbSet<ItemDonation> ItemDonations => Set<ItemDonation>();

    // Blog
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<BlogCategory> BlogCategories => Set<BlogCategory>();
    public DbSet<BlogTag> BlogTags => Set<BlogTag>();
    public DbSet<BlogTagMapping> BlogTagMappings => Set<BlogTagMapping>();
    public DbSet<BlogComment> BlogComments => Set<BlogComment>();

    // Media
    public DbSet<MediaFile> MediaFiles => Set<MediaFile>();
    public DbSet<Album> Albums => Set<Album>();

    // Ministry
    public DbSet<Ministry> Ministries => Set<Ministry>();
    public DbSet<MinistryLeader> MinistryLeaders => Set<MinistryLeader>();
    public DbSet<MinistryMember> MinistryMembers => Set<MinistryMember>();

    // LiveStream
    public DbSet<Models.LiveStream.LiveStream> LiveStreams => Set<Models.LiveStream.LiveStream>();

    // Prayer Requests
    public DbSet<PrayerRequest> PrayerRequests => Set<PrayerRequest>();
    public DbSet<PrayerReaction> PrayerReactions => Set<PrayerReaction>();

    // Schedule
    public DbSet<WeeklyActivity> WeeklyActivities => Set<WeeklyActivity>();

    // Notifications
    public DbSet<Notification> Notifications => Set<Notification>();

    // Audit
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Apply all configurations from the assembly
        builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        // Global query filter for soft delete on all BaseEntity types
        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            if (typeof(BaseEntity).IsAssignableFrom(entityType.ClrType))
            {
                var method = typeof(ApplicationDbContext)
                    .GetMethod(nameof(SetSoftDeleteFilter),
                        System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static)!
                    .MakeGenericMethod(entityType.ClrType);
                method.Invoke(null, new object[] { builder });
            }
        }

        // SermonTagMapping composite key
        builder.Entity<SermonTagMapping>()
            .HasKey(st => new { st.SermonId, st.TagId });

        builder.Entity<SermonTagMapping>()
            .HasOne(st => st.Sermon)
            .WithMany(s => s.TagMappings)
            .HasForeignKey(st => st.SermonId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<SermonTagMapping>()
            .HasOne(st => st.Tag)
            .WithMany(t => t.TagMappings)
            .HasForeignKey(st => st.TagId)
            .OnDelete(DeleteBehavior.Cascade);

        // BlogTagMapping composite key
        builder.Entity<BlogTagMapping>()
            .HasKey(bt => new { bt.PostId, bt.TagId });

        builder.Entity<BlogTagMapping>()
            .HasOne(bt => bt.Post)
            .WithMany(p => p.TagMappings)
            .HasForeignKey(bt => bt.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<BlogTagMapping>()
            .HasOne(bt => bt.Tag)
            .WithMany(t => t.TagMappings)
            .HasForeignKey(bt => bt.TagId)
            .OnDelete(DeleteBehavior.Cascade);

        // Sermon self-referencing comments
        builder.Entity<SermonComment>()
            .HasOne(c => c.ParentComment)
            .WithMany(c => c.Replies)
            .HasForeignKey(c => c.ParentCommentId)
            .OnDelete(DeleteBehavior.NoAction);

        // Blog self-referencing comments
        builder.Entity<BlogComment>()
            .HasOne(c => c.ParentComment)
            .WithMany(c => c.Replies)
            .HasForeignKey(c => c.ParentCommentId)
            .OnDelete(DeleteBehavior.NoAction);

        // Donation decimal precision
        builder.Entity<Donation>()
            .Property(d => d.Amount)
            .HasPrecision(18, 2);

        builder.Entity<DonationCampaign>()
            .Property(d => d.GoalAmount)
            .HasPrecision(18, 2);

        builder.Entity<DonationCampaign>()
            .Property(d => d.CurrentAmount)
            .HasPrecision(18, 2);

        builder.Entity<ChurchProject>()
            .Property(d => d.GoalAmount)
            .HasPrecision(18, 2);

        builder.Entity<ChurchProject>()
            .Property(d => d.CurrentAmount)
            .HasPrecision(18, 2);

        builder.Entity<Sponsor>()
            .Property(s => s.Amount)
            .HasPrecision(18, 2);

        // BlogPost unique slug
        builder.Entity<BlogPost>()
            .HasIndex(b => b.Slug)
            .IsUnique();

        // AuditLog - no soft delete, standalone table
        builder.Entity<AuditLog>()
            .HasIndex(a => a.Timestamp);

        builder.Entity<AuditLog>()
            .HasIndex(a => a.EntityName);
    }

    private static void SetSoftDeleteFilter<TEntity>(ModelBuilder builder) where TEntity : BaseEntity
    {
        builder.Entity<TEntity>().HasQueryFilter(e => !e.IsDeleted);
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var currentUserId = _httpContextAccessor?.HttpContext?.User?.FindFirst(
            System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.CreatedBy = currentUserId;
                    break;

                case EntityState.Modified:
                    entry.Entity.UpdatedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy = currentUserId;
                    break;

                case EntityState.Deleted:
                    entry.State = EntityState.Modified;
                    entry.Entity.IsDeleted = true;
                    entry.Entity.DeletedAt = DateTime.UtcNow;
                    entry.Entity.UpdatedBy = currentUserId;
                    break;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
