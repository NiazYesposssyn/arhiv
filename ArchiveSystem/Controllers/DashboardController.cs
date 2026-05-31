using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

[Authorize]
public sealed class DashboardController : Controller
{
    public IActionResult Index() => View();
}
