using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

[Authorize]
public sealed class RequestsController : Controller
{
    [Route("requests")]
    public IActionResult Index() => View();

    [HttpPost]
    [Route("requests/create")]
    [ValidateAntiForgeryToken]
    public IActionResult Create(string subject, string applicantName, string applicantEmail, string region)
    {
        TempData["PanelMessage"] = $"Өтінім AAS-RQ-{DateTime.UtcNow:HHmmss} нөмірімен тіркелді: {subject}.";
        return RedirectToAction(nameof(Index));
    }
}
