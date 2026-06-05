namespace FirstLoveChurch.API.Helpers;

public static class FileHelper
{
    private static readonly Dictionary<string, string[]> AllowedFileTypes = new()
    {
        { "Image", new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp" } },
        { "Video", new[] { ".mp4", ".avi", ".mkv", ".mov", ".wmv", ".webm" } },
        { "Audio", new[] { ".mp3", ".wav", ".ogg", ".m4a", ".flac", ".aac" } },
        { "Document", new[] { ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".txt" } }
    };

    private const long MaxFileSize = 100 * 1024 * 1024; // 100MB
    private const long MaxImageSize = 10 * 1024 * 1024; // 10MB

    public static string GetFileType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();

        foreach (var kvp in AllowedFileTypes)
        {
            if (kvp.Value.Contains(extension))
                return kvp.Key;
        }

        return "Unknown";
    }

    public static bool IsValidFileType(string fileName, string? allowedType = null)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();

        if (allowedType != null)
        {
            return AllowedFileTypes.TryGetValue(allowedType, out var allowed) && allowed.Contains(extension);
        }

        return AllowedFileTypes.Values.Any(v => v.Contains(extension));
    }

    public static bool IsValidFileSize(long fileSize, string? fileType = null)
    {
        if (fileType == "Image")
            return fileSize <= MaxImageSize;

        return fileSize <= MaxFileSize;
    }

    public static string GenerateUniqueFileName(string originalFileName)
    {
        var extension = Path.GetExtension(originalFileName);
        return $"{Guid.NewGuid():N}{extension}";
    }

    public static string FormatFileSize(long bytes)
    {
        string[] sizes = { "B", "KB", "MB", "GB" };
        var order = 0;
        double size = bytes;

        while (size >= 1024 && order < sizes.Length - 1)
        {
            order++;
            size /= 1024;
        }

        return $"{size:0.##} {sizes[order]}";
    }

    public static string GetContentType(string fileName)
    {
        var extension = Path.GetExtension(fileName).ToLowerInvariant();
        return extension switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            ".webp" => "image/webp",
            ".svg" => "image/svg+xml",
            ".mp4" => "video/mp4",
            ".webm" => "video/webm",
            ".mp3" => "audio/mpeg",
            ".wav" => "audio/wav",
            ".pdf" => "application/pdf",
            _ => "application/octet-stream"
        };
    }
}
