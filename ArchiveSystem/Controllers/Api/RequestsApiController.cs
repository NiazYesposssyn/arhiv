using ArchiveSystem.Data;
using ArchiveSystem.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArchiveSystem.Controllers.Api;

[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Route("api/requests")]
public sealed class RequestsApiController(ArchiveDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetRequests(string? search, RequestStatus? status)
    {
        var query = dbContext.Requests.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(request =>
                request.Subject.Contains(search) || request.RequestNumber.Contains(search));
        }

        if (status is not null)
        {
            query = query.Where(request => request.Status == status);
        }

        return Ok(await query.OrderByDescending(request => request.CreatedAt).Take(100).ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateRequest([FromBody] CreateArchiveRequest request)
    {
        var archiveRequest = new ArchiveRequest
        {
            RequestNumber = $"AAS-RQ-{DateTime.UtcNow:yyyyMMddHHmmss}",
            Subject = request.Subject,
            ApplicantName = request.ApplicantName,
            ApplicantEmail = request.ApplicantEmail,
            Region = request.Region,
            Status = RequestStatus.New
        };

        dbContext.Requests.Add(archiveRequest);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetRequests), new { id = archiveRequest.Id }, archiveRequest);
    }
}

public sealed record CreateArchiveRequest(
    string Subject,
    string ApplicantName,
    string ApplicantEmail,
    string Region);
