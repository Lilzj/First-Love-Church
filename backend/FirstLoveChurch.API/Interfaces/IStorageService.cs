namespace FirstLoveChurch.API.Interfaces;

public interface IStorageService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string folder = "uploads");
    Task<bool> DeleteFileAsync(string fileUrl);
    Task<string?> GetPresignedUrlAsync(string key, int expirationMinutes = 60);
}
