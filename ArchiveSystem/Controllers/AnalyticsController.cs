using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

[Authorize]
public sealed class AnalyticsController : Controller
{
    [Route("analytics")]
    public IActionResult Index() => View();
}
