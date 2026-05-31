using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

public sealed class HomeController : Controller
{
    public IActionResult Index() => View();

    [Route("about-system")]
    public IActionResult AboutSystem() => View();

    [Route("archive")]
    public IActionResult Archive() => View();

    [Route("services")]
    public IActionResult Services() => View();

    [Route("pricing")]
    public IActionResult Pricing() => View();

    [Route("news")]
    public IActionResult News() => View();

    [Route("faq")]
    public IActionResult Faq() => View();

    [Route("contacts")]
    public IActionResult Contacts() => View();

    [Route("help-center")]
    public IActionResult HelpCenter() => View();

    [Route("privacy")]
    public IActionResult Privacy() => View();

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error() => View();
}
