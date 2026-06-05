using Amazon.S3;
using Amazon.S3.Model;
using FirstLoveChurch.API.Interfaces;

namespace FirstLoveChurch.API.Services;

public class AwsS3StorageService : IStorageService
{
    private readonly IAmazonS3 _s3Client;
    private readonly IConfiguration _configuration;
    private readonly ILogger<AwsS3StorageService> _logger;
    private readonly string _bucketName;

    public AwsS3StorageService(
        IAmazonS3 s3Client,
        IConfiguration configuration,
        ILogger<AwsS3StorageService> logger)
    {
        _s3Client = s3Client;
        _configuration = configuration;
        _logger = logger;
        _bucketName = _configuration["AWS:S3:BucketName"]
            ?? throw new InvalidOperationException("AWS S3 Bucket name is not configured");
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string folder = "uploads")
    {
        var key = $"{folder}/{fileName}";

        var request = new PutObjectRequest
        {
            BucketName = _bucketName,
            Key = key,
            InputStream = fileStream,
            ContentType = Helpers.FileHelper.GetContentType(fileName),
            CannedACL = S3CannedACL.PublicRead
        };

        try
        {
            await _s3Client.PutObjectAsync(request);
            var region = _configuration["AWS:Region"] ?? "us-east-1";
            var fileUrl = $"https://{_bucketName}.s3.{region}.amazonaws.com/{key}";
            _logger.LogInformation("File uploaded to S3: {FileUrl}", fileUrl);
            return fileUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file to S3: {FileName}", fileName);
            throw;
        }
    }

    public async Task<bool> DeleteFileAsync(string fileUrl)
    {
        try
        {
            var uri = new Uri(fileUrl);
            var key = uri.AbsolutePath.TrimStart('/');

            var request = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = key
            };

            await _s3Client.DeleteObjectAsync(request);
            _logger.LogInformation("File deleted from S3: {Key}", key);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file from S3: {FileUrl}", fileUrl);
            return false;
        }
    }

    public async Task<string?> GetPresignedUrlAsync(string key, int expirationMinutes = 60)
    {
        try
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = key,
                Expires = DateTime.UtcNow.AddMinutes(expirationMinutes)
            };

            var url = await _s3Client.GetPreSignedURLAsync(request);
            return url;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating presigned URL for key: {Key}", key);
            return null;
        }
    }
}
