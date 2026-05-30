using System.Security.Claims;
using ArchiveSystem.Data;
using ArchiveSystem.Models;
using ArchiveSystem.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArchiveSystem.Controllers;

[Authorize]
public class HomeController : Controller
{
    private readonly IDashboardService _dashboardService;
    private readonly UserManager<ApplicationUser> _userManager;

    public HomeController(IDashboardService dashboardService, UserManager<ApplicationUser> userManager)
    {
        _dashboardService = dashboardService;
        _userManager = userManager;
    }

    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        var canSeeAll = User.IsInRole(RoleNames.Administrator) || User.IsInRole(RoleNames.Archivist);
        return View(await _dashboardService.GetDashboardAsync(user?.Id, canSeeAll));
    }

    [AllowAnonymous]
    public IActionResult Error() => View();
}

[AllowAnonymous]
public class AccountController : Controller
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IAuditService _auditService;
    private readonly IEmailSender _emailSender;

    public AccountController(
        SignInManager<ApplicationUser> signInManager,
        UserManager<ApplicationUser> userManager,
        IJwtTokenService jwtTokenService,
        IAuditService auditService,
        IEmailSender emailSender)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _jwtTokenService = jwtTokenService;
        _auditService = auditService;
        _emailSender = emailSender;
    }

    public IActionResult Login(string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        return View(new LoginViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user is null || !user.IsActive)
        {
            ModelState.AddModelError(string.Empty, "Email немесе құпиясөз қате.");
            return View(model);
        }

        var result = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
        if (result.RequiresTwoFactor)
        {
            return RedirectToAction(nameof(TwoFactor), new { returnUrl, model.RememberMe });
        }

        if (result.Succeeded)
        {
            user.LastLoginAt = DateTimeOffset.UtcNow;
            await _userManager.UpdateAsync(user);
            await _auditService.LogAsync(user, "Жүйеге кіру", "Auth", user.Id.ToString(), "Cookie сессиясы ашылды", HttpContext.Connection.RemoteIpAddress?.ToString());
            TempData["Toast"] = "Қош келдіңіз! Жүйеге сәтті кірдіңіз.";
            return LocalRedirect(returnUrl ?? Url.Action("Index", "Home")!);
        }

        ModelState.AddModelError(string.Empty, "Email немесе құпиясөз қате.");
        return View(model);
    }

    public IActionResult Register() => View(new RegisterViewModel());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = new ApplicationUser
        {
            UserName = model.Email,
            Email = model.Email,
            FullName = model.FullName,
            Department = model.Department,
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, RoleNames.User);
            await _auditService.LogAsync(user, "Тіркелу", "Auth", user.Id.ToString(), "Жаңа пайдаланушы тіркелді", HttpContext.Connection.RemoteIpAddress?.ToString());
            await _signInManager.SignInAsync(user, isPersistent: false);
            TempData["Toast"] = "Аккаунт құрылды.";
            return RedirectToAction("Index", "Home");
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return View(model);
    }

    public IActionResult TwoFactor(string? returnUrl = null, bool rememberMe = false)
    {
        ViewData["ReturnUrl"] = returnUrl;
        ViewData["RememberMe"] = rememberMe;
        return View(new TwoFactorViewModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> TwoFactor(TwoFactorViewModel model, string? returnUrl = null, bool rememberMe = false)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var result = await _signInManager.TwoFactorAuthenticatorSignInAsync(model.Code.Replace(" ", string.Empty), rememberMe, model.RememberMachine);
        if (result.Succeeded)
        {
            return LocalRedirect(returnUrl ?? Url.Action("Index", "Home")!);
        }

        ModelState.AddModelError(string.Empty, "2FA коды жарамсыз.");
        return View(model);
    }

    public IActionResult ForgotPassword() => View(new ForgotPasswordViewModel());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user is not null)
        {
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            await _emailSender.SendAsync(model.Email, "Archive Access System: құпиясөзді қалпына келтіру", $"Reset token: {token}");
        }

        TempData["Toast"] = "Егер email тіркелген болса, қалпына келтіру нұсқаулығы жіберілді.";
        return RedirectToAction(nameof(Login));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return RedirectToAction(nameof(Login));
    }

    public IActionResult AccessDenied() => View();

    [HttpPost]
    public async Task<IActionResult> Token([FromBody] LoginViewModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user is null || !await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return Unauthorized(new { message = "Invalid credentials" });
        }

        return Ok(new { accessToken = await _jwtTokenService.CreateTokenAsync(user) });
    }
}

[Authorize(Policy = "CanManageArchive")]
public class DocumentsController : Controller
{
    private readonly IDocumentService _documentService;
    private readonly ArchiveDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IReportService _reportService;

    public DocumentsController(IDocumentService documentService, ArchiveDbContext context, UserManager<ApplicationUser> userManager, IReportService reportService)
    {
        _documentService = documentService;
        _context = context;
        _userManager = userManager;
        _reportService = reportService;
    }

    public async Task<IActionResult> Index(string? search, Guid? categoryId, DocumentStatus? status) =>
        View(await _documentService.SearchAsync(search, categoryId, status));

    public async Task<IActionResult> Details(Guid id)
    {
        var document = await _documentService.GetDetailsAsync(id);
        return document is null ? NotFound() : View(document);
    }

    public async Task<IActionResult> Create()
    {
        return View(new DocumentUploadViewModel
        {
            Categories = await _context.DocumentCategories.OrderBy(x => x.Name).ToListAsync()
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(DocumentUploadViewModel model)
    {
        model.Categories = await _context.DocumentCategories.OrderBy(x => x.Name).ToListAsync();
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _userManager.GetUserAsync(User);
        if (user is null)
        {
            return Challenge();
        }

        var document = await _documentService.CreateAsync(model, user);
        TempData["Toast"] = $"{document.Number} құжаты жүктелді.";
        return RedirectToAction(nameof(Details), new { document.Id });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Archive(Guid id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not null)
        {
            await _documentService.ArchiveAsync(id, user);
        }

        TempData["Toast"] = "Құжат архивтелді.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> Download(Guid id)
    {
        var document = await _documentService.GetDetailsAsync(id);
        if (document is null)
        {
            return NotFound();
        }

        return Redirect(document.FilePath);
    }

    public async Task<IActionResult> Export()
    {
        var bytes = await _reportService.ExportDocumentsCsvAsync();
        return File(bytes, "text/csv", $"archive-documents-{DateTime.UtcNow:yyyyMMdd}.csv");
    }
}

[Authorize]
public class RequestsController : Controller
{
    private readonly IArchiveRequestService _requestService;
    private readonly ArchiveDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IReportService _reportService;

    public RequestsController(IArchiveRequestService requestService, ArchiveDbContext context, UserManager<ApplicationUser> userManager, IReportService reportService)
    {
        _requestService = requestService;
        _context = context;
        _userManager = userManager;
        _reportService = reportService;
    }

    public async Task<IActionResult> Index(string? search, RequestStatus? status)
    {
        var user = await _userManager.GetUserAsync(User);
        var canSeeAll = User.IsInRole(RoleNames.Administrator) || User.IsInRole(RoleNames.Archivist);
        return View(await _requestService.SearchAsync(search, status, user?.Id, canSeeAll));
    }

    public async Task<IActionResult> Details(Guid id)
    {
        var request = await _requestService.GetDetailsAsync(id);
        return request is null ? NotFound() : View(request);
    }

    public async Task<IActionResult> Create()
    {
        return View(new RequestCreateViewModel
        {
            Documents = await _context.ArchiveDocuments.OrderByDescending(x => x.CreatedAt).Take(50).ToListAsync()
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(RequestCreateViewModel model)
    {
        model.Documents = await _context.ArchiveDocuments.OrderByDescending(x => x.CreatedAt).Take(50).ToListAsync();
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _userManager.GetUserAsync(User);
        if (user is null)
        {
            return Challenge();
        }

        var request = await _requestService.CreateAsync(model, user);
        TempData["Toast"] = $"{request.Number} заявкасы құрылды.";
        return RedirectToAction(nameof(Details), new { request.Id });
    }

    [Authorize(Policy = "CanManageArchive")]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateStatus(Guid id, RequestStatus status, string? comment)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not null)
        {
            await _requestService.UpdateStatusAsync(id, status, user, comment);
        }

        TempData["Toast"] = "Заявка мәртебесі жаңартылды.";
        return RedirectToAction(nameof(Details), new { id });
    }

    public async Task<IActionResult> Export()
    {
        var bytes = await _reportService.ExportRequestsCsvAsync();
        return File(bytes, "text/csv", $"archive-requests-{DateTime.UtcNow:yyyyMMdd}.csv");
    }
}

[Authorize(Policy = "CanManageArchive")]
public class AnalyticsController : Controller
{
    private readonly IDashboardService _dashboardService;

    public AnalyticsController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    public async Task<IActionResult> Index() => View(await _dashboardService.GetAnalyticsAsync());
}

[Authorize(Policy = "AdministratorOnly")]
public class UsersController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;

    public UsersController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole<Guid>> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IActionResult> Index()
    {
        var users = await _userManager.Users.OrderBy(x => x.FullName).ToListAsync();
        var roles = new Dictionary<Guid, IList<string>>();
        foreach (var user in users)
        {
            roles[user.Id] = await _userManager.GetRolesAsync(user);
        }

        return View(new UsersManagementViewModel { Users = users, Roles = roles });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> SetRole(Guid userId, string role)
    {
        if (!await _roleManager.RoleExistsAsync(role))
        {
            return BadRequest();
        }

        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
        {
            return NotFound();
        }

        var currentRoles = await _userManager.GetRolesAsync(user);
        await _userManager.RemoveFromRolesAsync(user, currentRoles);
        await _userManager.AddToRoleAsync(user, role);
        TempData["Toast"] = "Рөл жаңартылды.";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleActive(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user is null)
        {
            return NotFound();
        }

        user.IsActive = !user.IsActive;
        await _userManager.UpdateAsync(user);
        return RedirectToAction(nameof(Index));
    }
}

[Authorize(Policy = "AdministratorOnly")]
public class SettingsController : Controller
{
    private readonly ArchiveDbContext _context;
    private readonly IReportService _reportService;

    public SettingsController(ArchiveDbContext context, IReportService reportService)
    {
        _context = context;
        _reportService = reportService;
    }

    public async Task<IActionResult> Index() => View(await _context.SystemSettings.OrderBy(x => x.Key).ToListAsync());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Save(Dictionary<Guid, string> values)
    {
        var settings = await _context.SystemSettings.ToListAsync();
        foreach (var setting in settings)
        {
            if (values.TryGetValue(setting.Id, out var value))
            {
                setting.Value = value;
            }
        }

        await _context.SaveChangesAsync();
        TempData["Toast"] = "Жүйе баптаулары сақталды.";
        return RedirectToAction(nameof(Index));
    }

    public async Task<IActionResult> ExecutiveReport()
    {
        var bytes = await _reportService.GenerateExecutiveReportAsync();
        return File(bytes, "text/html", $"archive-report-{DateTime.UtcNow:yyyyMMdd}.html");
    }
}

[Authorize]
public class ProfileController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ArchiveDbContext _context;

    public ProfileController(UserManager<ApplicationUser> userManager, ArchiveDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }

    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is null)
        {
            return Challenge();
        }

        return View(new ProfileViewModel
        {
            FullName = user.FullName,
            Email = user.Email ?? string.Empty,
            Department = user.Department,
            PreferredLanguage = user.PreferredLanguage,
            TwoFactorEnabled = user.TwoFactorEnabled,
            RecentActivity = await _context.AuditLogs.Where(x => x.UserId == user.Id).OrderByDescending(x => x.CreatedAt).Take(12).ToListAsync()
        });
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Update(ProfileViewModel model)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is null)
        {
            return Challenge();
        }

        user.FullName = model.FullName;
        user.Department = model.Department;
        user.PreferredLanguage = model.PreferredLanguage;
        await _userManager.UpdateAsync(user);
        TempData["Toast"] = "Профиль жаңартылды.";
        return RedirectToAction(nameof(Index));
    }
}

[Authorize(Policy = "AdministratorOnly")]
public class AuditLogsController : Controller
{
    private readonly ArchiveDbContext _context;

    public AuditLogsController(ArchiveDbContext context)
    {
        _context = context;
    }

    public async Task<IActionResult> Index(string? search)
    {
        var query = _context.AuditLogs.Include(x => x.User).AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLowerInvariant();
            query = query.Where(x => x.Action.ToLower().Contains(term) || x.Details.ToLower().Contains(term));
        }

        ViewData["Search"] = search;
        return View(await query.OrderByDescending(x => x.CreatedAt).Take(200).ToListAsync());
    }
}

[Authorize]
public class NotificationsController : Controller
{
    private readonly INotificationService _notificationService;
    private readonly UserManager<ApplicationUser> _userManager;

    public NotificationsController(INotificationService notificationService, UserManager<ApplicationUser> userManager)
    {
        _notificationService = notificationService;
        _userManager = userManager;
    }

    public async Task<IActionResult> Index()
    {
        var user = await _userManager.GetUserAsync(User);
        return user is null ? Challenge() : View(await _notificationService.GetUnreadAsync(user.Id));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Read(Guid id)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user is not null)
        {
            await _notificationService.MarkReadAsync(id, user.Id);
        }

        return RedirectToAction(nameof(Index));
    }
}

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[ApiController]
[Route("api/v1")]
public class IntegrationApiController : ControllerBase
{
    private readonly ArchiveDbContext _context;

    public IntegrationApiController(ArchiveDbContext context)
    {
        _context = context;
    }

    [HttpGet("documents")]
    public async Task<IActionResult> Documents() =>
        Ok(await _context.ArchiveDocuments
            .Include(x => x.Category)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new { x.Id, x.Number, x.Title, Category = x.Category!.Name, x.Status, x.CreatedAt })
            .ToListAsync());

    [HttpGet("requests")]
    public async Task<IActionResult> Requests() =>
        Ok(await _context.ArchiveRequests
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new { x.Id, x.Number, x.Subject, x.Status, x.Priority, x.CreatedAt })
            .ToListAsync());
}

public class CultureController : Controller
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult Set(string culture, string returnUrl = "/")
    {
        Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
            new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1), SameSite = SameSiteMode.Lax });

        return LocalRedirect(returnUrl);
    }
}
