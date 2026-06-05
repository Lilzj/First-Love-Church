using FirstLoveChurch.API.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FirstLoveChurch.API.Data.Seeds;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<ApplicationDbContext>>();

        try
        {
            // Apply pending migrations
            await context.Database.MigrateAsync();

            // Seed roles
            await SeedRolesAsync(roleManager, logger);

            // Seed admin user
            await SeedAdminUserAsync(userManager, logger);

            // Seed sample data (development only)
            await SeedSampleDataAsync(context, logger);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while seeding the database");
        }
    }

    private static async Task SeedRolesAsync(RoleManager<ApplicationRole> roleManager, ILogger logger)
    {
        var roles = new[]
        {
            new ApplicationRole { Name = "Pastor", Description = "Senior Pastor with full system access" },
            new ApplicationRole { Name = "ChurchAdmin", Description = "Church administrator with management access" },
            new ApplicationRole { Name = "Editor", Description = "Content editor for sermons, blogs, and media" },
            new ApplicationRole { Name = "MediaManager", Description = "Manages media uploads and galleries" },
            new ApplicationRole { Name = "Member", Description = "Regular church member" }
        };

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role.Name!))
            {
                var result = await roleManager.CreateAsync(role);
                if (result.Succeeded)
                    logger.LogInformation("Created role: {Role}", role.Name);
                else
                    logger.LogWarning("Failed to create role {Role}: {Errors}", role.Name,
                        string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }
    }

    private static async Task SeedAdminUserAsync(UserManager<ApplicationUser> userManager, ILogger logger)
    {
        const string adminEmail = "admin@firstlovechurch.org";

        if (await userManager.FindByEmailAsync(adminEmail) != null)
            return;

        var adminUser = new ApplicationUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            FirstName = "System",
            LastName = "Administrator",
            EmailConfirmed = true,
            IsActive = true,
            MemberSince = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(adminUser, "Admin@123456");
        if (result.Succeeded)
        {
            await userManager.AddToRolesAsync(adminUser, new[] { "Pastor", "ChurchAdmin" });
            logger.LogInformation("Admin user created successfully: {Email}", adminEmail);
        }
        else
        {
            logger.LogWarning("Failed to create admin user: {Errors}",
                string.Join(", ", result.Errors.Select(e => e.Description)));
        }
    }

    private static async Task SeedSampleDataAsync(ApplicationDbContext context, ILogger logger)
    {
        // Seed sermon categories if none exist
        if (!await context.SermonCategories.AnyAsync())
        {
            var categories = new[]
            {
                new Models.Sermons.SermonCategory { Name = "Sunday Service", Slug = "sunday-service", Description = "Regular Sunday worship sermons" },
                new Models.Sermons.SermonCategory { Name = "Bible Study", Slug = "bible-study", Description = "Midweek Bible study sessions" },
                new Models.Sermons.SermonCategory { Name = "Youth Service", Slug = "youth-service", Description = "Youth ministry sermons" },
                new Models.Sermons.SermonCategory { Name = "Revival", Slug = "revival", Description = "Revival and special event sermons" },
                new Models.Sermons.SermonCategory { Name = "Prayer Meeting", Slug = "prayer-meeting", Description = "Prayer meeting messages" }
            };

            await context.SermonCategories.AddRangeAsync(categories);
            logger.LogInformation("Seeded {Count} sermon categories", categories.Length);
        }

        // Seed blog categories
        if (!await context.BlogCategories.AnyAsync())
        {
            var blogCategories = new[]
            {
                new Models.Blog.BlogCategory { Name = "Devotional", Slug = "devotional", Description = "Daily devotional articles" },
                new Models.Blog.BlogCategory { Name = "Teaching", Slug = "teaching", Description = "Biblical teachings and studies" },
                new Models.Blog.BlogCategory { Name = "Testimony", Slug = "testimony", Description = "Member testimonies and stories" },
                new Models.Blog.BlogCategory { Name = "Church News", Slug = "church-news", Description = "Church announcements and news" },
                new Models.Blog.BlogCategory { Name = "Family", Slug = "family", Description = "Family-focused articles" }
            };

            await context.BlogCategories.AddRangeAsync(blogCategories);
            logger.LogInformation("Seeded {Count} blog categories", blogCategories.Length);
        }

        // Seed weekly activities
        if (!await context.WeeklyActivities.AnyAsync())
        {
            var activities = new[]
            {
                new Models.Schedule.WeeklyActivity { Title = "Sunday Worship Service", DayOfWeek = DayOfWeek.Sunday, StartTime = new TimeSpan(9, 0, 0), EndTime = new TimeSpan(11, 30, 0), Location = "Main Sanctuary", ActivityType = "Service", SortOrder = 1 },
                new Models.Schedule.WeeklyActivity { Title = "Sunday School", DayOfWeek = DayOfWeek.Sunday, StartTime = new TimeSpan(8, 0, 0), EndTime = new TimeSpan(8, 45, 0), Location = "Main Sanctuary", ActivityType = "Service", SortOrder = 2 },
                new Models.Schedule.WeeklyActivity { Title = "Midweek Bible Study", DayOfWeek = DayOfWeek.Wednesday, StartTime = new TimeSpan(18, 0, 0), EndTime = new TimeSpan(19, 30, 0), Location = "Fellowship Hall", ActivityType = "BibleStudy", SortOrder = 3 },
                new Models.Schedule.WeeklyActivity { Title = "Friday Prayer Meeting", DayOfWeek = DayOfWeek.Friday, StartTime = new TimeSpan(18, 0, 0), EndTime = new TimeSpan(20, 0, 0), Location = "Prayer Room", ActivityType = "Prayer", SortOrder = 4 },
                new Models.Schedule.WeeklyActivity { Title = "Youth Fellowship", DayOfWeek = DayOfWeek.Saturday, StartTime = new TimeSpan(16, 0, 0), EndTime = new TimeSpan(18, 0, 0), Location = "Youth Center", ActivityType = "Fellowship", SortOrder = 5 }
            };

            await context.WeeklyActivities.AddRangeAsync(activities);
            logger.LogInformation("Seeded {Count} weekly activities", activities.Length);
        }

        // Seed ministries
        if (!await context.Ministries.AnyAsync())
        {
            var ministries = new[]
            {
                new Models.Ministry.Ministry { Name = "Youth Ministry", Slug = "youth-ministry", Description = "Empowering the next generation for Christ", Mission = "To raise godly youth who are passionate about God", IsActive = true },
                new Models.Ministry.Ministry { Name = "Worship Ministry", Slug = "worship-ministry", Description = "Leading the congregation in praise and worship", Mission = "To create an atmosphere of worship", IsActive = true },
                new Models.Ministry.Ministry { Name = "Men's Ministry", Slug = "mens-ministry", Description = "Building godly men for kingdom service", Mission = "To disciple men to become servant leaders", IsActive = true },
                new Models.Ministry.Ministry { Name = "Women's Ministry", Slug = "womens-ministry", Description = "Empowering women in faith and purpose", Mission = "To strengthen women spiritually and emotionally", IsActive = true },
                new Models.Ministry.Ministry { Name = "Children's Ministry", Slug = "childrens-ministry", Description = "Teaching children the Word of God", Mission = "To lay a solid spiritual foundation in children", IsActive = true },
                new Models.Ministry.Ministry { Name = "Outreach Ministry", Slug = "outreach-ministry", Description = "Reaching the community with the love of Christ", Mission = "To share the gospel and serve the community", IsActive = true }
            };

            await context.Ministries.AddRangeAsync(ministries);
            logger.LogInformation("Seeded {Count} ministries", ministries.Length);
        }

        await context.SaveChangesAsync();
    }
}
