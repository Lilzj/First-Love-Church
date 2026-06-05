namespace FirstLoveChurch.API.DTOs.Common;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public T? Data { get; set; }
    public List<string>? Errors { get; set; }
    public int StatusCode { get; set; }

    public static ApiResponse<T> SuccessResponse(T data, string? message = null, int statusCode = 200)
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message ?? "Request successful",
            Data = data,
            StatusCode = statusCode
        };
    }

    public static ApiResponse<T> FailResponse(string message, int statusCode = 400)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            StatusCode = statusCode
        };
    }

    public static ApiResponse<T> FailResponse(List<string> errors, string? message = null, int statusCode = 400)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message ?? "One or more errors occurred",
            Errors = errors,
            StatusCode = statusCode
        };
    }
}

public class ApiResponse : ApiResponse<object>
{
    public static ApiResponse SuccessResponse(string? message = null, int statusCode = 200)
    {
        return new ApiResponse
        {
            Success = true,
            Message = message ?? "Request successful",
            StatusCode = statusCode
        };
    }

    public new static ApiResponse FailResponse(string message, int statusCode = 400)
    {
        return new ApiResponse
        {
            Success = false,
            Message = message,
            StatusCode = statusCode
        };
    }
}
