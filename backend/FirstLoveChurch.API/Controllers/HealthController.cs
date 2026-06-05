using Microsoft.AspNetCore.Mvc;

namespace FirstLoveChurch.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { status = "Healthy", timestamp = DateTime.UtcNow, version = "1.0.0" });
}
