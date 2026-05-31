using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

[Authorize]
public sealed class DocumentsController : Controller
{
    [Route("documents")]
    public IActionResult Index() => View();

    [HttpPost]
    [Route("documents/upload")]
    [ValidateAntiForgeryToken]
    public IActionResult Upload(IFormFile? file, string title, string category, string region)
    {
        TempData["PanelMessage"] = file is null
            ? "Файл таңдалмады, бірақ жүктеу формасы тексерілді."
            : $"{title} құжаты {region} аймағына қабылданды. Нөмірі: AAS-{DateTime.UtcNow:yyyyMMddHHmm}.";

        return RedirectToAction(nameof(Index));
    }
}
