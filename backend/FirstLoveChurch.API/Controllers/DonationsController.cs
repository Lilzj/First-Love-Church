using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Donations;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Donations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class DonationsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IPaymentService _paymentService;

    public DonationsController(IUnitOfWork unitOfWork, IMapper mapper, IPaymentService paymentService)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _paymentService = paymentService;
    }

    [HttpGet]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> GetDonations([FromQuery] PaginationParams paginationParams)
    {
        var result = await _unitOfWork.Repository<Donation>().GetPagedAsync(
            paginationParams, includeProperties: "Campaign,Project,User");
        var mapped = new PagedResult<DonationResponseDto>
        {
            Items = _mapper.Map<IReadOnlyList<DonationResponseDto>>(result.Items),
            TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize
        };
        return Ok(ApiResponse<PagedResult<DonationResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> GetDonation(Guid id)
    {
        var donation = await _unitOfWork.Repository<Donation>().GetByIdAsync(id, "Campaign,Project");
        if (donation == null) return NotFound(ApiResponse.FailResponse("Donation not found"));
        return Ok(ApiResponse<DonationResponseDto>.SuccessResponse(_mapper.Map<DonationResponseDto>(donation)));
    }

    [HttpPost]
    public async Task<IActionResult> CreateDonation([FromBody] CreateDonationDto dto)
    {
        var donation = _mapper.Map<Donation>(dto);
        donation.UserId = User.Identity?.IsAuthenticated == true
            ? User.FindFirst(ClaimTypes.NameIdentifier)?.Value : null;

        await _unitOfWork.Repository<Donation>().AddAsync(donation);
        await _unitOfWork.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDonation), new { id = donation.Id },
            ApiResponse<DonationResponseDto>.SuccessResponse(_mapper.Map<DonationResponseDto>(donation), "Donation recorded", 201));
    }

    [HttpPost("initialize-payment")]
    public async Task<IActionResult> InitializePayment([FromBody] PaymentInitiationDto dto)
    {
        var paymentRequest = new PaymentRequest
        {
            Amount = dto.Amount,
            Email = dto.Email ?? "",
            Currency = dto.Currency ?? "NGN",
            CallbackUrl = dto.CallbackUrl,
            Metadata = new Dictionary<string, string>
            {
                { "campaignId", dto.CampaignId?.ToString() ?? "" },
                { "projectId", dto.ProjectId?.ToString() ?? "" }
            }
        };

        var result = await _paymentService.InitializePaymentAsync(paymentRequest);
        if (!result.Success)
            return BadRequest(ApiResponse.FailResponse(result.Message ?? "Payment initialization failed"));

        return Ok(ApiResponse<PaymentInitiationResponse>.SuccessResponse(result, "Payment initialized"));
    }

    [HttpPost("verify-payment")]
    public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerificationDto dto)
    {
        var result = await _paymentService.VerifyPaymentAsync(dto.Reference);
        if (!result.Success)
            return BadRequest(ApiResponse.FailResponse(result.Message ?? "Payment verification failed"));

        // Update donation status
        var donation = await _unitOfWork.Repository<Donation>().FirstOrDefaultAsync(
            d => d.PaymentReference == dto.Reference);
        if (donation != null)
        {
            donation.Status = "Completed";
            donation.TransactionId = result.TransactionId;
            donation.PaidAt = result.PaidAt ?? DateTime.UtcNow;
            _unitOfWork.Repository<Donation>().Update(donation);

            // Update campaign/project amount
            if (donation.CampaignId.HasValue)
            {
                var campaign = await _unitOfWork.Repository<DonationCampaign>().GetByIdAsync(donation.CampaignId.Value);
                if (campaign != null)
                {
                    campaign.CurrentAmount += donation.Amount;
                    _unitOfWork.Repository<DonationCampaign>().Update(campaign);
                }
            }
            if (donation.ProjectId.HasValue)
            {
                var project = await _unitOfWork.Repository<ChurchProject>().GetByIdAsync(donation.ProjectId.Value);
                if (project != null)
                {
                    project.CurrentAmount += donation.Amount;
                    _unitOfWork.Repository<ChurchProject>().Update(project);
                }
            }

            await _unitOfWork.SaveChangesAsync();
        }

        return Ok(ApiResponse<PaymentVerificationResponse>.SuccessResponse(result, "Payment verified"));
    }

    [HttpGet("summary")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> GetDonationSummary()
    {
        var allDonations = await _unitOfWork.Repository<Donation>().FindAsync(d => d.Status == "Completed");
        var now = DateTime.UtcNow;
        var thisMonth = allDonations.Where(d => d.PaidAt?.Month == now.Month && d.PaidAt?.Year == now.Year);
        var lastMonth = allDonations.Where(d => d.PaidAt?.Month == now.AddMonths(-1).Month && d.PaidAt?.Year == now.AddMonths(-1).Year);

        var thisMonthTotal = thisMonth.Sum(d => d.Amount);
        var lastMonthTotal = lastMonth.Sum(d => d.Amount);

        var summary = new DonationSummaryDto
        {
            TotalDonations = allDonations.Sum(d => d.Amount),
            TotalDonorsCount = allDonations.Select(d => d.DonorEmail ?? d.UserId).Distinct().Count(),
            TotalTransactions = allDonations.Count,
            ThisMonthTotal = thisMonthTotal,
            LastMonthTotal = lastMonthTotal,
            GrowthPercentage = lastMonthTotal > 0 ? Math.Round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100, 2) : 0
        };

        return Ok(ApiResponse<DonationSummaryDto>.SuccessResponse(summary));
    }
}

[ApiController]
[Route("api/v1/[controller]")]
public class CampaignsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CampaignsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetCampaigns([FromQuery] PaginationParams paginationParams)
    {
        var result = await _unitOfWork.Repository<DonationCampaign>().GetPagedAsync(paginationParams, includeProperties: "Donations");
        var mapped = new PagedResult<CampaignResponseDto>
        {
            Items = _mapper.Map<IReadOnlyList<CampaignResponseDto>>(result.Items),
            TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize
        };
        return Ok(ApiResponse<PagedResult<CampaignResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCampaign(Guid id)
    {
        var campaign = await _unitOfWork.Repository<DonationCampaign>().GetByIdAsync(id, "Donations");
        if (campaign == null) return NotFound(ApiResponse.FailResponse("Campaign not found"));
        return Ok(ApiResponse<CampaignResponseDto>.SuccessResponse(_mapper.Map<CampaignResponseDto>(campaign)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> CreateCampaign([FromBody] CreateCampaignDto dto)
    {
        var campaign = _mapper.Map<DonationCampaign>(dto);
        campaign.Slug = SlugHelper.GenerateSlug(dto.Title);
        await _unitOfWork.Repository<DonationCampaign>().AddAsync(campaign);
        await _unitOfWork.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCampaign), new { id = campaign.Id },
            ApiResponse<CampaignResponseDto>.SuccessResponse(_mapper.Map<CampaignResponseDto>(campaign), "Campaign created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> UpdateCampaign(Guid id, [FromBody] UpdateCampaignDto dto)
    {
        var campaign = await _unitOfWork.Repository<DonationCampaign>().GetByIdAsync(id);
        if (campaign == null) return NotFound(ApiResponse.FailResponse("Campaign not found"));
        _mapper.Map(dto, campaign);
        _unitOfWork.Repository<DonationCampaign>().Update(campaign);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<CampaignResponseDto>.SuccessResponse(_mapper.Map<CampaignResponseDto>(campaign), "Campaign updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteCampaign(Guid id)
    {
        var campaign = await _unitOfWork.Repository<DonationCampaign>().GetByIdAsync(id);
        if (campaign == null) return NotFound(ApiResponse.FailResponse("Campaign not found"));
        _unitOfWork.Repository<DonationCampaign>().Delete(campaign);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Campaign deleted"));
    }
}

[ApiController]
[Route("api/v1/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProjectsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetProjects([FromQuery] PaginationParams paginationParams)
    {
        var result = await _unitOfWork.Repository<ChurchProject>().GetPagedAsync(paginationParams, includeProperties: "Donations");
        var mapped = new PagedResult<ProjectResponseDto>
        {
            Items = _mapper.Map<IReadOnlyList<ProjectResponseDto>>(result.Items),
            TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize
        };
        return Ok(ApiResponse<PagedResult<ProjectResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProject(Guid id)
    {
        var project = await _unitOfWork.Repository<ChurchProject>().GetByIdAsync(id, "Donations");
        if (project == null) return NotFound(ApiResponse.FailResponse("Project not found"));
        return Ok(ApiResponse<ProjectResponseDto>.SuccessResponse(_mapper.Map<ProjectResponseDto>(project)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto dto)
    {
        var project = _mapper.Map<ChurchProject>(dto);
        project.Slug = SlugHelper.GenerateSlug(dto.Title);
        await _unitOfWork.Repository<ChurchProject>().AddAsync(project);
        await _unitOfWork.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProject), new { id = project.Id },
            ApiResponse<ProjectResponseDto>.SuccessResponse(_mapper.Map<ProjectResponseDto>(project), "Project created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> UpdateProject(Guid id, [FromBody] UpdateProjectDto dto)
    {
        var project = await _unitOfWork.Repository<ChurchProject>().GetByIdAsync(id);
        if (project == null) return NotFound(ApiResponse.FailResponse("Project not found"));
        _mapper.Map(dto, project);
        _unitOfWork.Repository<ChurchProject>().Update(project);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<ProjectResponseDto>.SuccessResponse(_mapper.Map<ProjectResponseDto>(project), "Project updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin")]
    public async Task<IActionResult> DeleteProject(Guid id)
    {
        var project = await _unitOfWork.Repository<ChurchProject>().GetByIdAsync(id);
        if (project == null) return NotFound(ApiResponse.FailResponse("Project not found"));
        _unitOfWork.Repository<ChurchProject>().Delete(project);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Project deleted"));
    }
}

[ApiController]
[Route("api/v1/[controller]")]
[Authorize(Roles = "Pastor,ChurchAdmin")]
public class SponsorsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public SponsorsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetSponsors([FromQuery] PaginationParams p)
    {
        var result = await _unitOfWork.Repository<Sponsor>().GetPagedAsync(p);
        var mapped = new PagedResult<SponsorDto> { Items = _mapper.Map<IReadOnlyList<SponsorDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<SponsorDto>>.SuccessResponse(mapped));
    }

    [HttpPost]
    public async Task<IActionResult> CreateSponsor([FromBody] CreateSponsorDto dto)
    {
        var sponsor = _mapper.Map<Sponsor>(dto);
        await _unitOfWork.Repository<Sponsor>().AddAsync(sponsor);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<SponsorDto>.SuccessResponse(_mapper.Map<SponsorDto>(sponsor), "Sponsor created", 201));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSponsor(Guid id)
    {
        var sponsor = await _unitOfWork.Repository<Sponsor>().GetByIdAsync(id);
        if (sponsor == null) return NotFound(ApiResponse.FailResponse("Sponsor not found"));
        _unitOfWork.Repository<Sponsor>().Delete(sponsor);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Sponsor deleted"));
    }
}
