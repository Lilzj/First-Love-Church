using System.Net;
using System.Text.Json;
using FirstLoveChurch.API.DTOs.Common;

namespace FirstLoveChurch.API.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred. TraceId: {TraceId}", context.TraceIdentifier);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var (statusCode, message) = exception switch
        {
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "You are not authorized to access this resource"),
            KeyNotFoundException => (HttpStatusCode.NotFound, "The requested resource was not found"),
            ArgumentException e => (HttpStatusCode.BadRequest, e.Message),
            InvalidOperationException e => (HttpStatusCode.BadRequest, e.Message),
            FluentValidation.ValidationException e => (HttpStatusCode.BadRequest, string.Join("; ", e.Errors.Select(err => err.ErrorMessage))),
            _ => (HttpStatusCode.InternalServerError, "An unexpected error occurred. Please try again later.")
        };

        context.Response.StatusCode = (int)statusCode;

        var response = new ApiResponse
        {
            Success = false,
            Message = message,
            StatusCode = (int)statusCode,
            Errors = exception is FluentValidation.ValidationException validationEx
                ? validationEx.Errors.Select(e => e.ErrorMessage).ToList()
                : null
        };

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        await context.Response.WriteAsync(JsonSerializer.Serialize(response, options));
    }
}

public static class ExceptionHandlingMiddlewareExtensions
{
    public static IApplicationBuilder UseExceptionHandling(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}
