using ArchiveSystem.Models;
using ArchiveSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace ArchiveSystem.Controllers.Api;

[ApiController]
[Route("api/auth")]
public sealed class AuthApiController(JwtTokenService jwtTokenService) : ControllerBase
{
    [HttpPost("token")]
    public IActionResult CreateToken([FromBody] TokenRequest request)
    {
        var role = request.Email.Contains("admin", StringComparison.OrdinalIgnoreCase)
            ? "Администратор"
            : "Пользователь";

        var user = new ApplicationUser
        {
            FullName = request.Email.Split('@')[0],
            Email = request.Email,
            Role = role
        };

        return Ok(new
        {
            access_token = jwtTokenService.CreateToken(user),
            token_type = "Bearer",
            expires_in = 28800,
            user = new { user.FullName, user.Email, user.Role }
        });
    }
}

public sealed record TokenRequest(string Email, string Password);
