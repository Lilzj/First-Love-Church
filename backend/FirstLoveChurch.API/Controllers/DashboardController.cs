using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Ministry;
using FirstLoveChurch.API.Models.PrayerRequests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Authorize(Roles = "Pastor,ChurchAdmin")]
public class DashboardController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly Microsoft.AspNetCore.Identity.UserManager<Models.Identity.ApplicationUser> _userManager;
    public DashboardController(IUnitOfWork unitOfWork, Microsoft.AspNetCore.Identity.UserManager<Models.Identity.ApplicationUser> userManager) { _unitOfWork = unitOfWork; _userManager = userManager; }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var now = DateTime.UtcNow;
        var summary = new DTOs.Dashboard.DashboardSummaryDto
        {
            TotalMembers = _userManager.Users.Count(u => !u.IsDeleted),
            TotalSermons = await _unitOfWork.Repository<Models.Sermons.Sermon>().CountAsync(),
            TotalEvents = await _unitOfWork.Repository<Models.Events.Event>().CountAsync(),
            TotalBlogPosts = await _unitOfWork.Repository<Models.Blog.BlogPost>().CountAsync(b => b.Status == "Published"),
            TotalMinistries = await _unitOfWork.Repository<Ministry>().CountAsync(),
            TotalPrayerRequests = await _unitOfWork.Repository<PrayerRequest>().CountAsync(),
            TotalDonations = (await _unitOfWork.Repository<Models.Donations.Donation>().FindAsync(d => d.Status == "Completed")).Sum(d => d.Amount),
            ActiveCampaigns = await _unitOfWork.Repository<Models.Donations.DonationCampaign>().CountAsync(c => c.IsActive),
            UpcomingEvents = await _unitOfWork.Repository<Models.Events.Event>().CountAsync(e => e.StartDate >= now),
            PendingPrayerRequests = await _unitOfWork.Repository<PrayerRequest>().CountAsync(pr => pr.Status == "Pending"),
            NewMembersThisMonth = _userManager.Users.Count(u => !u.IsDeleted && u.CreatedAt.Month == now.Month && u.CreatedAt.Year == now.Year)
        };
        return Ok(ApiResponse<DTOs.Dashboard.DashboardSummaryDto>.SuccessResponse(summary));
    }
}
