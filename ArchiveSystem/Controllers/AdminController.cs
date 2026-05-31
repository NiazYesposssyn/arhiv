using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

[Authorize]
public sealed class AdminController : Controller
{
    [Route("users")]
    public IActionResult Users() => View();

    [Route("roles")]
    public IActionResult Roles() => View();

    [Route("audit-logs")]
    public IActionResult AuditLogs() => View();

    [Route("notifications")]
    public IActionResult Notifications() => View();

    [Route("reports")]
    public IActionResult Reports() => View();

    [Route("settings")]
    public IActionResult Settings() => View();

    [Route("profile")]
    public IActionResult Profile() => View();

    [Route("support")]
    public IActionResult Support() => View();

    [Route("api-docs")]
    public IActionResult ApiDocs() => View();

    [Route("backups")]
    public IActionResult Backups() => View();

    [Route("security")]
    public IActionResult Security() => View();
}
