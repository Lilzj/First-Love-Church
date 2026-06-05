using AutoMapper;
using FirstLoveChurch.API.DTOs.Auth;
using FirstLoveChurch.API.DTOs.Blog;
using FirstLoveChurch.API.DTOs.Donations;
using FirstLoveChurch.API.DTOs.Events;
using FirstLoveChurch.API.DTOs.LiveStream;
using FirstLoveChurch.API.DTOs.Media;
using FirstLoveChurch.API.DTOs.Ministry;
using FirstLoveChurch.API.DTOs.Notifications;
using FirstLoveChurch.API.DTOs.PrayerRequests;
using FirstLoveChurch.API.DTOs.Schedule;
using FirstLoveChurch.API.DTOs.Sermons;
using FirstLoveChurch.API.Models.Blog;
using FirstLoveChurch.API.Models.Donations;
using FirstLoveChurch.API.Models.Events;
using FirstLoveChurch.API.Models.Identity;
using FirstLoveChurch.API.Models.Media;
using FirstLoveChurch.API.Models.Ministry;
using FirstLoveChurch.API.Models.Notifications;
using FirstLoveChurch.API.Models.PrayerRequests;
using FirstLoveChurch.API.Models.Schedule;
using FirstLoveChurch.API.Models.Sermons;

namespace FirstLoveChurch.API.Configurations;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        // === Auth / Users ===
        CreateMap<ApplicationUser, UserProfileDto>()
            .ForMember(d => d.FullName, opt => opt.MapFrom(s => s.FullName));

        CreateMap<RegisterDto, ApplicationUser>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.Email));

        CreateMap<UpdateProfileDto, ApplicationUser>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        // === Sermons ===
        CreateMap<Sermon, SermonResponseDto>()
            .ForMember(d => d.SeriesName, opt => opt.MapFrom(s => s.Series != null ? s.Series.Title : null))
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category != null ? s.Category.Name : null))
            .ForMember(d => d.SpeakerName, opt => opt.MapFrom(s => s.Speaker != null ? s.Speaker.FullName : null))
            .ForMember(d => d.SpeakerImageUrl, opt => opt.MapFrom(s => s.Speaker != null ? s.Speaker.ProfileImageUrl : null))
            .ForMember(d => d.Tags, opt => opt.MapFrom(s => s.TagMappings.Select(t => t.Tag.Name).ToList()))
            .ForMember(d => d.CommentCount, opt => opt.MapFrom(s => s.Comments.Count));

        CreateMap<Sermon, SermonListDto>()
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category != null ? s.Category.Name : null))
            .ForMember(d => d.SpeakerName, opt => opt.MapFrom(s => s.Speaker != null ? s.Speaker.FullName : null));

        CreateMap<CreateSermonDto, Sermon>();
        CreateMap<UpdateSermonDto, Sermon>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<SermonCategory, SermonCategoryDto>()
            .ForMember(d => d.SermonCount, opt => opt.MapFrom(s => s.Sermons.Count));
        CreateMap<CreateSermonCategoryDto, SermonCategory>();

        CreateMap<SermonTag, SermonTagDto>();
        CreateMap<CreateSermonTagDto, SermonTag>();

        CreateMap<SermonSeries, SermonSeriesDto>()
            .ForMember(d => d.SermonCount, opt => opt.MapFrom(s => s.Sermons.Count));
        CreateMap<CreateSermonSeriesDto, SermonSeries>();

        CreateMap<SermonComment, SermonCommentDto>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User != null ? s.User.FullName : "Anonymous"))
            .ForMember(d => d.UserImageUrl, opt => opt.MapFrom(s => s.User != null ? s.User.ProfileImageUrl : null));
        CreateMap<CreateSermonCommentDto, SermonComment>();

        // === Events ===
        CreateMap<Event, EventResponseDto>()
            .ForMember(d => d.OrganizerName, opt => opt.MapFrom(s => s.Organizer != null ? s.Organizer.FullName : null))
            .ForMember(d => d.RegistrationCount, opt => opt.MapFrom(s => s.Registrations.Count))
            .ForMember(d => d.AttendanceCount, opt => opt.MapFrom(s => s.Attendances.Count))
            .ForMember(d => d.VolunteerCount, opt => opt.MapFrom(s => s.VolunteerSignups.Count));

        CreateMap<Event, EventListDto>()
            .ForMember(d => d.RegistrationCount, opt => opt.MapFrom(s => s.Registrations.Count));

        CreateMap<CreateEventDto, Event>();
        CreateMap<UpdateEventDto, Event>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<EventRegistration, EventRegistrationResponseDto>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User != null ? s.User.FullName : s.GuestName));

        CreateMap<VolunteerSignup, VolunteerSignupResponseDto>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.FullName));

        // === Donations ===
        CreateMap<Donation, DonationResponseDto>()
            .ForMember(d => d.CampaignTitle, opt => opt.MapFrom(s => s.Campaign != null ? s.Campaign.Title : null))
            .ForMember(d => d.ProjectTitle, opt => opt.MapFrom(s => s.Project != null ? s.Project.Title : null));
        CreateMap<CreateDonationDto, Donation>();

        CreateMap<DonationCampaign, CampaignResponseDto>()
            .ForMember(d => d.DonationCount, opt => opt.MapFrom(s => s.Donations.Count));
        CreateMap<CreateCampaignDto, DonationCampaign>();
        CreateMap<UpdateCampaignDto, DonationCampaign>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<ChurchProject, ProjectResponseDto>()
            .ForMember(d => d.DonationCount, opt => opt.MapFrom(s => s.Donations.Count));
        CreateMap<CreateProjectDto, ChurchProject>();
        CreateMap<UpdateProjectDto, ChurchProject>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<Sponsor, SponsorDto>();
        CreateMap<CreateSponsorDto, Sponsor>();

        CreateMap<ItemDonation, ItemDonationDto>();
        CreateMap<CreateItemDonationDto, ItemDonation>();

        // === Blog ===
        CreateMap<BlogPost, BlogPostResponseDto>()
            .ForMember(d => d.AuthorName, opt => opt.MapFrom(s => s.Author.FullName))
            .ForMember(d => d.AuthorImageUrl, opt => opt.MapFrom(s => s.Author.ProfileImageUrl))
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category != null ? s.Category.Name : null))
            .ForMember(d => d.Tags, opt => opt.MapFrom(s => s.TagMappings.Select(t => t.Tag.Name).ToList()))
            .ForMember(d => d.CommentCount, opt => opt.MapFrom(s => s.Comments.Count));

        CreateMap<BlogPost, BlogPostListDto>()
            .ForMember(d => d.AuthorName, opt => opt.MapFrom(s => s.Author.FullName))
            .ForMember(d => d.CategoryName, opt => opt.MapFrom(s => s.Category != null ? s.Category.Name : null))
            .ForMember(d => d.CommentCount, opt => opt.MapFrom(s => s.Comments.Count));

        CreateMap<CreateBlogPostDto, BlogPost>();
        CreateMap<UpdateBlogPostDto, BlogPost>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<BlogCategory, BlogCategoryDto>()
            .ForMember(d => d.PostCount, opt => opt.MapFrom(s => s.Posts.Count));
        CreateMap<CreateBlogCategoryDto, BlogCategory>();

        CreateMap<BlogTag, BlogTagDto>();
        CreateMap<CreateBlogTagDto, BlogTag>();

        CreateMap<BlogComment, BlogCommentDto>()
            .ForMember(d => d.AuthorName, opt => opt.MapFrom(s => s.User != null ? s.User.FullName : s.AuthorName))
            .ForMember(d => d.UserImageUrl, opt => opt.MapFrom(s => s.User != null ? s.User.ProfileImageUrl : null));
        CreateMap<CreateBlogCommentDto, BlogComment>();

        // === Media ===
        CreateMap<MediaFile, MediaFileResponseDto>()
            .ForMember(d => d.AlbumTitle, opt => opt.MapFrom(s => s.Album != null ? s.Album.Title : null))
            .ForMember(d => d.UploadedByName, opt => opt.MapFrom(s => s.UploadedBy != null ? s.UploadedBy.FullName : null));

        CreateMap<Album, AlbumResponseDto>()
            .ForMember(d => d.MediaCount, opt => opt.MapFrom(s => s.MediaFiles.Count));
        CreateMap<CreateAlbumDto, Album>();
        CreateMap<UpdateAlbumDto, Album>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        // === Ministry ===
        CreateMap<Models.Ministry.Ministry, MinistryResponseDto>()
            .ForMember(d => d.LeaderCount, opt => opt.MapFrom(s => s.Leaders.Count))
            .ForMember(d => d.MemberCount, opt => opt.MapFrom(s => s.Members.Count));

        CreateMap<Models.Ministry.Ministry, MinistryListDto>()
            .ForMember(d => d.MemberCount, opt => opt.MapFrom(s => s.Members.Count));

        CreateMap<CreateMinistryDto, Models.Ministry.Ministry>();
        CreateMap<UpdateMinistryDto, Models.Ministry.Ministry>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        CreateMap<MinistryLeader, MinistryLeaderDto>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.FullName))
            .ForMember(d => d.UserImageUrl, opt => opt.MapFrom(s => s.User.ProfileImageUrl));

        CreateMap<MinistryMember, MinistryMemberDto>()
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.FullName))
            .ForMember(d => d.UserImageUrl, opt => opt.MapFrom(s => s.User.ProfileImageUrl));

        // === LiveStream ===
        CreateMap<Models.LiveStream.LiveStream, LiveStreamResponseDto>();
        CreateMap<CreateLiveStreamDto, Models.LiveStream.LiveStream>();
        CreateMap<UpdateLiveStreamDto, Models.LiveStream.LiveStream>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        // === Prayer Requests ===
        CreateMap<PrayerRequest, PrayerRequestResponseDto>();
        CreateMap<CreatePrayerRequestDto, PrayerRequest>();

        // === Schedule ===
        CreateMap<WeeklyActivity, WeeklyActivityResponseDto>();
        CreateMap<CreateWeeklyActivityDto, WeeklyActivity>();
        CreateMap<UpdateWeeklyActivityDto, WeeklyActivity>()
            .ForAllMembers(opt => opt.Condition((src, dest, srcMember) => srcMember != null));

        // === Notifications ===
        CreateMap<Notification, NotificationResponseDto>();
        CreateMap<CreateNotificationDto, Notification>();
    }
}
