using AutoMapper;
using FirstLoveChurch.API.DTOs.Common;
using FirstLoveChurch.API.DTOs.Media;
using FirstLoveChurch.API.Helpers;
using FirstLoveChurch.API.Interfaces;
using FirstLoveChurch.API.Models.Media;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class MediaController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IStorageService _storageService;
    public MediaController(IUnitOfWork unitOfWork, IMapper mapper, IStorageService storageService) { _unitOfWork = unitOfWork; _mapper = mapper; _storageService = storageService; }

    [HttpGet]
    public async Task<IActionResult> GetFiles([FromQuery] PaginationParams p, [FromQuery] string? fileType, [FromQuery] Guid? albumId)
    {
        System.Linq.Expressions.Expression<Func<MediaFile, bool>>? filter = null;
        if (!string.IsNullOrEmpty(fileType) && albumId.HasValue) filter = m => m.FileType == fileType && m.AlbumId == albumId;
        else if (!string.IsNullOrEmpty(fileType)) filter = m => m.FileType == fileType;
        else if (albumId.HasValue) filter = m => m.AlbumId == albumId;
        var result = await _unitOfWork.Repository<MediaFile>().GetPagedAsync(p, filter, includeProperties: "Album,UploadedBy");
        var mapped = new PagedResult<MediaFileResponseDto> { Items = _mapper.Map<IReadOnlyList<MediaFileResponseDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<MediaFileResponseDto>>.SuccessResponse(mapped));
    }

    [HttpPost("upload")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor,MediaManager")]
    [RequestSizeLimit(100 * 1024 * 1024)] // 100MB
    public async Task<IActionResult> UploadFile(IFormFile file, [FromQuery] Guid? albumId, [FromQuery] string? description)
    {
        if (file == null || file.Length == 0)
            return BadRequest(ApiResponse.FailResponse("No file provided"));
        if (!FileHelper.IsValidFileType(file.FileName))
            return BadRequest(ApiResponse.FailResponse("Invalid file type"));
        if (!FileHelper.IsValidFileSize(file.Length, FileHelper.GetFileType(file.FileName)))
            return BadRequest(ApiResponse.FailResponse("File size exceeds limit"));

        var uniqueFileName = FileHelper.GenerateUniqueFileName(file.FileName);
        var fileType = FileHelper.GetFileType(file.FileName);
        var folder = $"media/{fileType.ToLower()}s";

        using var stream = file.OpenReadStream();
        var fileUrl = await _storageService.UploadFileAsync(stream, uniqueFileName, folder);

        var mediaFile = new MediaFile
        {
            FileName = uniqueFileName, OriginalFileName = file.FileName, FileUrl = fileUrl,
            FileType = fileType, FileSize = file.Length, MimeType = file.ContentType,
            Description = description, AlbumId = albumId,
            UploadedById = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
        };
        await _unitOfWork.Repository<MediaFile>().AddAsync(mediaFile);
        await _unitOfWork.SaveChangesAsync();

        return Ok(ApiResponse<MediaUploadResponseDto>.SuccessResponse(new MediaUploadResponseDto
        {
            Id = mediaFile.Id, FileUrl = fileUrl, FileName = uniqueFileName,
            FileType = fileType, FileSize = file.Length
        }, "File uploaded", 201));
    }

    [HttpPost("upload-multiple")]
    [Authorize(Roles = "Pastor,ChurchAdmin,Editor,MediaManager")]
    [RequestSizeLimit(500 * 1024 * 1024)]
    public async Task<IActionResult> UploadMultipleFiles(List<IFormFile> files, [FromQuery] Guid? albumId)
    {
        if (files == null || !files.Any())
            return BadRequest(ApiResponse.FailResponse("No files provided"));
        var results = new List<MediaUploadResponseDto>();
        foreach (var file in files)
        {
            if (!FileHelper.IsValidFileType(file.FileName) || !FileHelper.IsValidFileSize(file.Length)) continue;
            var uniqueFileName = FileHelper.GenerateUniqueFileName(file.FileName);
            var fileType = FileHelper.GetFileType(file.FileName);
            using var stream = file.OpenReadStream();
            var fileUrl = await _storageService.UploadFileAsync(stream, uniqueFileName, $"media/{fileType.ToLower()}s");
            var mediaFile = new MediaFile
            {
                FileName = uniqueFileName, OriginalFileName = file.FileName, FileUrl = fileUrl,
                FileType = fileType, FileSize = file.Length, MimeType = file.ContentType,
                AlbumId = albumId, UploadedById = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            };
            await _unitOfWork.Repository<MediaFile>().AddAsync(mediaFile);
            results.Add(new MediaUploadResponseDto { Id = mediaFile.Id, FileUrl = fileUrl, FileName = uniqueFileName, FileType = fileType, FileSize = file.Length });
        }
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<List<MediaUploadResponseDto>>.SuccessResponse(results, $"{results.Count} files uploaded"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> DeleteFile(Guid id)
    {
        var file = await _unitOfWork.Repository<MediaFile>().GetByIdAsync(id);
        if (file == null) return NotFound(ApiResponse.FailResponse("File not found"));
        await _storageService.DeleteFileAsync(file.FileUrl);
        _unitOfWork.Repository<MediaFile>().HardDelete(file);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("File deleted"));
    }
}

[ApiController]
[Route("api/v1/[controller]")]
public class AlbumsController : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public AlbumsController(IUnitOfWork unitOfWork, IMapper mapper) { _unitOfWork = unitOfWork; _mapper = mapper; }

    [HttpGet]
    public async Task<IActionResult> GetAlbums([FromQuery] PaginationParams p)
    {
        var result = await _unitOfWork.Repository<Album>().GetPagedAsync(p, includeProperties: "MediaFiles");
        var mapped = new PagedResult<AlbumResponseDto> { Items = _mapper.Map<IReadOnlyList<AlbumResponseDto>>(result.Items), TotalCount = result.TotalCount, PageNumber = result.PageNumber, PageSize = result.PageSize };
        return Ok(ApiResponse<PagedResult<AlbumResponseDto>>.SuccessResponse(mapped));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAlbum(Guid id)
    {
        var album = await _unitOfWork.Repository<Album>().GetByIdAsync(id, "MediaFiles");
        if (album == null) return NotFound(ApiResponse.FailResponse("Album not found"));
        return Ok(ApiResponse<AlbumResponseDto>.SuccessResponse(_mapper.Map<AlbumResponseDto>(album)));
    }

    [HttpPost]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> CreateAlbum([FromBody] CreateAlbumDto dto)
    {
        var album = _mapper.Map<Album>(dto);
        album.Slug = SlugHelper.GenerateSlug(dto.Title);
        await _unitOfWork.Repository<Album>().AddAsync(album);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<AlbumResponseDto>.SuccessResponse(_mapper.Map<AlbumResponseDto>(album), "Album created", 201));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> UpdateAlbum(Guid id, [FromBody] UpdateAlbumDto dto)
    {
        var album = await _unitOfWork.Repository<Album>().GetByIdAsync(id);
        if (album == null) return NotFound(ApiResponse.FailResponse("Album not found"));
        _mapper.Map(dto, album);
        _unitOfWork.Repository<Album>().Update(album);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse<AlbumResponseDto>.SuccessResponse(_mapper.Map<AlbumResponseDto>(album), "Album updated"));
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Pastor,ChurchAdmin,MediaManager")]
    public async Task<IActionResult> DeleteAlbum(Guid id)
    {
        var album = await _unitOfWork.Repository<Album>().GetByIdAsync(id);
        if (album == null) return NotFound(ApiResponse.FailResponse("Album not found"));
        _unitOfWork.Repository<Album>().Delete(album);
        await _unitOfWork.SaveChangesAsync();
        return Ok(ApiResponse.SuccessResponse("Album deleted"));
    }
}
