using ArchiveSystem.Data;
using ArchiveSystem.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ArchiveSystem.Controllers.Api;

[ApiController]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[Route("api/documents")]
public sealed class DocumentsApiController(ArchiveDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetDocuments(string? search, string? region, DocumentStatus? status)
    {
        var query = dbContext.Documents.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(document =>
                document.Title.Contains(search) || document.DocumentNumber.Contains(search));
        }

        if (!string.IsNullOrWhiteSpace(region))
        {
            query = query.Where(document => document.Region == region);
        }

        if (status is not null)
        {
            query = query.Where(document => document.Status == status);
        }

        return Ok(await query
            .OrderByDescending(document => document.UploadedAt)
            .Take(100)
            .ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateDocument([FromBody] CreateDocumentRequest request)
    {
        var document = new ArchiveDocument
        {
            DocumentNumber = $"AAS-{DateTime.UtcNow:yyyyMMddHHmmss}",
            Title = request.Title,
            Category = request.Category,
            Region = request.Region,
            FileType = request.FileType,
            FileSize = request.FileSize,
            Status = DocumentStatus.Active
        };

        dbContext.Documents.Add(document);
        await dbContext.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDocuments), new { id = document.Id }, document);
    }
}

public sealed record CreateDocumentRequest(
    string Title,
    string Category,
    string Region,
    string FileType,
    long FileSize);
