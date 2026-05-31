using System.Security.Claims;
using ArchiveSystem.Models;
using ArchiveSystem.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers;

public sealed class AuthController(JwtTokenService jwtTokenService) : Controller
{
    [Route("login")]
    public IActionResult Login() => View();

    [HttpPost]
    [Route("login")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(string email, string password)
    {
        var user = new ApplicationUser
        {
            FullName = email.Contains('@') ? email[..email.IndexOf('@')] : "Demo User",
            Email = email,
            Role = email.Contains("admin", StringComparison.OrdinalIgnoreCase) ? "Администратор" : "Архивариус",
            TwoFactorEnabled = true
        };

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.FullName),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Role, user.Role),
            new("jwt_preview", jwtTokenService.CreateToken(user))
        };

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme)));

        return RedirectToAction("Index", "Dashboard");
    }

    [Route("register")]
    public IActionResult Register() => View();

    [HttpPost]
    [Route("register")]
    [ValidateAntiForgeryToken]
    public IActionResult Register(string fullName, string email)
    {
        TempData["AuthMessage"] = $"{fullName}, өтінім қабылданды. Жүйе демо режимінде тіркеуді растады.";
        return RedirectToAction(nameof(Login));
    }

    [Route("forgot-password")]
    public IActionResult ForgotPassword() => View();

    [HttpPost]
    [Route("forgot-password")]
    [ValidateAntiForgeryToken]
    public IActionResult ForgotPassword(string email)
    {
        TempData["AuthMessage"] = $"{email} мекенжайына қалпына келтіру нұсқаулығы жіберілді.";
        return RedirectToAction(nameof(Login));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    [Route("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Home");
    }
}
