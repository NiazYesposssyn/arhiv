using System.Globalization;
using System.Security.Claims;
using System.Text;
using ArchiveSystem.Data;
using ArchiveSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;

namespace ArchiveSystem.Services;

public interface IJwtTokenService
{
    Task<string> CreateTokenAsync(ApplicationUser user);
}

public interface IDashboardService
{
    Task<DashboardViewModel> GetDashboardAsync(Guid? userId, bool isAdministrator);
    Task<AnalyticsViewModel> GetAnalyticsAsync();
}

public interface IDocumentService
{
    Task<DocumentIndexViewModel> SearchAsync(string? search, Guid? categoryId, DocumentStatus? status);
    Task<ArchiveDocument?> GetDetailsAsync(Guid id);
    Task<ArchiveDocument> CreateAsync(DocumentUploadViewModel model, ApplicationUser user);
    Task ArchiveAsync(Guid id, ApplicationUser user);
}

public interface IArchiveRequestService
{
    Task<RequestIndexViewModel> SearchAsync(string? search, RequestStatus? status, Guid? userId, bool canSeeAll);
    Task<ArchiveRequest?> GetDetailsAsync(Guid id);
    Task<ArchiveRequest> CreateAsync(RequestCreateViewModel model, ApplicationUser user);
    Task UpdateStatusAsync(Guid id, RequestStatus status, ApplicationUser actor, string? comment);
}

public interface IAuditService
{
    Task LogAsync(ApplicationUser? user, string action, string entityName, string? entityId, string details, string? ipAddress);
}

public interface INotificationService
{
    Task<IReadOnlyList<Notification>> GetUnreadAsync(Guid userId);
    Task NotifyAsync(Guid userId, string title, string message, string type = "info");
    Task MarkReadAsync(Guid id, Guid userId);
}

public interface IReportService
{
    Task<byte[]> ExportRequestsCsvAsync();
    Task<byte[]> ExportDocumentsCsvAsync();
    Task<byte[]> GenerateExecutiveReportAsync();
}

public interface IEmailSender
{
    Task SendAsync(string to, string subject, string body);
}

public class JwtTokenService : IJwtTokenService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;

    public JwtTokenService(IConfiguration configuration, UserManager<ApplicationUser> userManager)
    {
        _configuration = configuration;
        _userManager = userManager;
    }

    public async Task<string> CreateTokenAsync(ApplicationUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
            new(JwtRegisteredClaimNames.Name, user.FullName),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.FullName)
        };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var minutes = int.TryParse(_configuration["Jwt:AccessTokenMinutes"], out var parsed) ? parsed : 60;
        var descriptor = new SecurityTokenDescriptor
        {
            Issuer = _configuration["Jwt:Issuer"],
            Audience = _configuration["Jwt:Audience"],
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(minutes),
            SigningCredentials = credentials
        };

        return new JsonWebTokenHandler().CreateToken(descriptor);
    }
}

public class DashboardService : IDashboardService
{
    private readonly ArchiveDbContext _context;

    public DashboardService(ArchiveDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardViewModel> GetDashboardAsync(Guid? userId, bool isAdministrator)
    {
        var requestQuery = _context.ArchiveRequests.AsQueryable();
        if (!isAdministrator && userId.HasValue)
        {
            requestQuery = requestQuery.Where(x => x.RequestedById == userId.Value);
        }

        var totalDocuments = await _context.ArchiveDocuments.CountAsync();
        var totalUsers = await _context.Users.CountAsync();
        var openRequests = await requestQuery.CountAsync(x => x.Status != RequestStatus.Completed && x.Status != RequestStatus.Rejected);
        var completedRequests = await requestQuery.CountAsync(x => x.Status == RequestStatus.Completed);

        return new DashboardViewModel
        {
            TotalDocuments = totalDocuments,
            TotalUsers = totalUsers,
            OpenRequests = openRequests,
            CompletedRequests = completedRequests,
            Kpis =
            [
                new("Құжаттар қоры", totalDocuments.ToString("N0", CultureInfo.InvariantCulture), "+18%", "bi bi-archive", "indigo"),
                new("Белсенді пайдаланушылар", totalUsers.ToString("N0", CultureInfo.InvariantCulture), "+7%", "bi bi-people", "cyan"),
                new("Ашық заявкалар", openRequests.ToString("N0", CultureInfo.InvariantCulture), "-4%", "bi bi-inboxes", "amber"),
                new("Орындалған заявкалар", completedRequests.ToString("N0", CultureInfo.InvariantCulture), "+21%", "bi bi-check2-circle", "emerald")
            ],
            DocumentsByMonth = await GetDocumentsByMonthAsync(),
            RequestsByStatus = await _context.ArchiveRequests
                .GroupBy(x => x.Status)
                .Select(x => new ChartPoint(x.Key.ToString(), x.Count()))
                .ToListAsync(),
            RecentDocuments = await _context.ArchiveDocuments
                .Include(x => x.Category)
                .Include(x => x.UploadedBy)
                .OrderByDescending(x => x.CreatedAt)
                .Take(6)
                .ToListAsync(),
            RecentRequests = await requestQuery
                .Include(x => x.RequestedBy)
                .Include(x => x.ArchiveDocument)
                .OrderByDescending(x => x.CreatedAt)
                .Take(6)
                .ToListAsync(),
            AuditLogs = await _context.AuditLogs
                .Include(x => x.User)
                .OrderByDescending(x => x.CreatedAt)
                .Take(8)
                .ToListAsync(),
            Notifications = userId.HasValue
                ? await _context.Notifications.Where(x => x.UserId == userId.Value).OrderByDescending(x => x.CreatedAt).Take(5).ToListAsync()
                : []
        };
    }

    public async Task<AnalyticsViewModel> GetAnalyticsAsync()
    {
        var branches = await _context.ArchiveBranches
            .OrderByDescending(x => x.DocumentsCount)
            .Select(x => new BranchMetric(x.Name, x.Region, x.DocumentsCount, x.MonthlyRequests, x.Latitude, x.Longitude))
            .ToListAsync();

        return new AnalyticsViewModel
        {
            Kpis =
            [
                new("Айлық сұраныс", branches.Sum(x => x.Requests).ToString("N0", CultureInfo.InvariantCulture), "+12.4%", "bi bi-graph-up-arrow", "indigo"),
                new("Орташа өңдеу", "2.8 сағ", "-9%", "bi bi-clock-history", "emerald"),
                new("SLA орындалуы", "96.7%", "+3.2%", "bi bi-shield-check", "cyan"),
                new("Цифрландыру", "78%", "+6%", "bi bi-cloud-check", "amber")
            ],
            DocumentsByCategory = await _context.ArchiveDocuments
                .Include(x => x.Category)
                .GroupBy(x => x.Category!.Name)
                .Select(x => new ChartPoint(x.Key, x.Count()))
                .ToListAsync(),
            RequestsByRegion = branches.Select(x => new ChartPoint(x.Region, x.Requests)).ToList(),
            ActivityHeatmap = Enumerable.Range(1, 12).Select(day => new ChartPoint($"{day}:00", Random.Shared.Next(12, 96))).ToList(),
            Branches = branches
        };
    }

    private async Task<IReadOnlyList<ChartPoint>> GetDocumentsByMonthAsync()
    {
        var since = DateTimeOffset.UtcNow.AddMonths(-6);
        var documents = await _context.ArchiveDocuments
            .Where(x => x.CreatedAt >= since)
            .ToListAsync();

        return documents
            .GroupBy(x => x.CreatedAt.ToString("MMM", CultureInfo.GetCultureInfo("kk-KZ")))
            .Select(x => new ChartPoint(x.Key, x.Count()))
            .ToList();
    }
}

public class DocumentService : IDocumentService
{
    private static readonly HashSet<string> AllowedExtensions = new(StringComparer.OrdinalIgnoreCase)
    {
        ".pdf", ".docx", ".xlsx", ".jpg", ".jpeg", ".png"
    };

    private readonly ArchiveDbContext _context;
    private readonly IWebHostEnvironment _environment;
    private readonly IAuditService _auditService;

    public DocumentService(ArchiveDbContext context, IWebHostEnvironment environment, IAuditService auditService)
    {
        _context = context;
        _environment = environment;
        _auditService = auditService;
    }

    public async Task<DocumentIndexViewModel> SearchAsync(string? search, Guid? categoryId, DocumentStatus? status)
    {
        var query = _context.ArchiveDocuments
            .Include(x => x.Category)
            .Include(x => x.Tags)
            .Include(x => x.UploadedBy)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLowerInvariant();
            query = query.Where(x =>
                x.Title.ToLower().Contains(term) ||
                x.Number.ToLower().Contains(term) ||
                x.Tags.Any(tag => tag.Name.ToLower().Contains(term)));
        }

        if (categoryId.HasValue)
        {
            query = query.Where(x => x.CategoryId == categoryId.Value);
        }

        if (status.HasValue)
        {
            query = query.Where(x => x.Status == status.Value);
        }

        return new DocumentIndexViewModel
        {
            Search = search,
            CategoryId = categoryId,
            Status = status,
            Categories = await _context.DocumentCategories.OrderBy(x => x.Name).ToListAsync(),
            Documents = await query.OrderByDescending(x => x.UpdatedAt).ToListAsync()
        };
    }

    public Task<ArchiveDocument?> GetDetailsAsync(Guid id) =>
        _context.ArchiveDocuments
            .Include(x => x.Category)
            .Include(x => x.Tags)
            .Include(x => x.Versions).ThenInclude(x => x.CreatedBy)
            .Include(x => x.UploadedBy)
            .FirstOrDefaultAsync(x => x.Id == id);

    public async Task<ArchiveDocument> CreateAsync(DocumentUploadViewModel model, ApplicationUser user)
    {
        var fileName = model.File?.FileName ?? "document.pdf";
        var extension = Path.GetExtension(fileName);
        if (!AllowedExtensions.Contains(extension))
        {
            throw new InvalidOperationException("Бұл файл форматына рұқсат етілмеген.");
        }

        var number = await GenerateDocumentNumberAsync();
        var uploadRoot = Path.Combine(_environment.WebRootPath, "uploads");
        Directory.CreateDirectory(uploadRoot);
        var safeFileName = $"{number}{extension.ToLowerInvariant()}";
        var relativePath = $"/uploads/{safeFileName}";
        var absolutePath = Path.Combine(uploadRoot, safeFileName);

        if (model.File is not null)
        {
            await using var stream = File.Create(absolutePath);
            await model.File.CopyToAsync(stream);
        }

        var document = new ArchiveDocument
        {
            Number = number,
            Title = model.Title,
            Description = model.Description,
            CategoryId = model.CategoryId,
            UploadedById = user.Id,
            FilePath = relativePath,
            FileType = extension.TrimStart('.').ToUpperInvariant(),
            FileSizeBytes = model.File?.Length ?? 0,
            Status = DocumentStatus.Active
        };

        foreach (var tag in model.Tags.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries).Distinct(StringComparer.OrdinalIgnoreCase))
        {
            document.Tags.Add(new DocumentTag { Name = tag });
        }

        document.Versions.Add(new DocumentVersion
        {
            CreatedById = user.Id,
            Version = "1.0",
            ChangeNote = "Құжат жүйеге жүктелді"
        });

        _context.ArchiveDocuments.Add(document);
        await _context.SaveChangesAsync();
        await _auditService.LogAsync(user, "Құжат жүктеу", nameof(ArchiveDocument), document.Id.ToString(), document.Title, null);
        return document;
    }

    public async Task ArchiveAsync(Guid id, ApplicationUser user)
    {
        var document = await _context.ArchiveDocuments.FindAsync(id);
        if (document is null)
        {
            return;
        }

        document.Status = DocumentStatus.Archived;
        document.ArchivedAt = DateTimeOffset.UtcNow;
        document.UpdatedAt = DateTimeOffset.UtcNow;
        await _context.SaveChangesAsync();
        await _auditService.LogAsync(user, "Құжат архивтеу", nameof(ArchiveDocument), document.Id.ToString(), document.Title, null);
    }

    private async Task<string> GenerateDocumentNumberAsync()
    {
        var year = DateTimeOffset.UtcNow.Year;
        var count = await _context.ArchiveDocuments.CountAsync(x => x.CreatedAt.Year == year) + 1;
        return $"AAS-{year}-{count:0000}";
    }
}

public class ArchiveRequestService : IArchiveRequestService
{
    private readonly ArchiveDbContext _context;
    private readonly IAuditService _auditService;
    private readonly INotificationService _notificationService;

    public ArchiveRequestService(ArchiveDbContext context, IAuditService auditService, INotificationService notificationService)
    {
        _context = context;
        _auditService = auditService;
        _notificationService = notificationService;
    }

    public async Task<RequestIndexViewModel> SearchAsync(string? search, RequestStatus? status, Guid? userId, bool canSeeAll)
    {
        var query = _context.ArchiveRequests
            .Include(x => x.RequestedBy)
            .Include(x => x.ArchiveDocument)
            .AsQueryable();

        if (!canSeeAll && userId.HasValue)
        {
            query = query.Where(x => x.RequestedById == userId.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLowerInvariant();
            query = query.Where(x => x.Subject.ToLower().Contains(term) || x.Number.ToLower().Contains(term));
        }

        if (status.HasValue)
        {
            query = query.Where(x => x.Status == status.Value);
        }

        return new RequestIndexViewModel
        {
            Search = search,
            Status = status,
            Requests = await query.OrderByDescending(x => x.CreatedAt).ToListAsync()
        };
    }

    public Task<ArchiveRequest?> GetDetailsAsync(Guid id) =>
        _context.ArchiveRequests
            .Include(x => x.RequestedBy)
            .Include(x => x.ArchiveDocument)
            .Include(x => x.Comments).ThenInclude(x => x.Author)
            .FirstOrDefaultAsync(x => x.Id == id);

    public async Task<ArchiveRequest> CreateAsync(RequestCreateViewModel model, ApplicationUser user)
    {
        var request = new ArchiveRequest
        {
            Number = await GenerateRequestNumberAsync(),
            Subject = model.Subject,
            Description = model.Description,
            Priority = model.Priority,
            ArchiveDocumentId = model.ArchiveDocumentId,
            RequestedById = user.Id,
            Status = RequestStatus.New,
            DueAt = DateTimeOffset.UtcNow.AddDays(model.Priority >= RequestPriority.High ? 2 : 5)
        };

        _context.ArchiveRequests.Add(request);
        await _context.SaveChangesAsync();
        await _auditService.LogAsync(user, "Заявка құру", nameof(ArchiveRequest), request.Id.ToString(), request.Subject, null);
        await _notificationService.NotifyAsync(user.Id, "Заявка қабылданды", $"{request.Number} жүйеге тіркелді.", "success");
        return request;
    }

    public async Task UpdateStatusAsync(Guid id, RequestStatus status, ApplicationUser actor, string? comment)
    {
        var request = await _context.ArchiveRequests.Include(x => x.RequestedBy).FirstOrDefaultAsync(x => x.Id == id);
        if (request is null)
        {
            return;
        }

        request.Status = status;
        if (status is RequestStatus.Completed or RequestStatus.Rejected)
        {
            request.ClosedAt = DateTimeOffset.UtcNow;
        }

        if (!string.IsNullOrWhiteSpace(comment))
        {
            request.Comments.Add(new RequestComment
            {
                AuthorId = actor.Id,
                Message = comment,
                IsInternal = false
            });
        }

        await _context.SaveChangesAsync();
        await _auditService.LogAsync(actor, "Заявка мәртебесін өзгерту", nameof(ArchiveRequest), request.Id.ToString(), status.ToString(), null);
        await _notificationService.NotifyAsync(request.RequestedById, "Заявка мәртебесі жаңарды", $"{request.Number}: {status}", "info");
    }

    private async Task<string> GenerateRequestNumberAsync()
    {
        var year = DateTimeOffset.UtcNow.Year;
        var count = await _context.ArchiveRequests.CountAsync(x => x.CreatedAt.Year == year) + 1;
        return $"REQ-{year}-{count:0000}";
    }
}

public class AuditService : IAuditService
{
    private readonly ArchiveDbContext _context;

    public AuditService(ArchiveDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(ApplicationUser? user, string action, string entityName, string? entityId, string details, string? ipAddress)
    {
        _context.AuditLogs.Add(new AuditLog
        {
            UserId = user?.Id,
            Action = action,
            EntityName = entityName,
            EntityId = entityId,
            Details = details,
            IpAddress = ipAddress
        });
        await _context.SaveChangesAsync();
    }
}

public class NotificationService : INotificationService
{
    private readonly ArchiveDbContext _context;

    public NotificationService(ArchiveDbContext context)
    {
        _context = context;
    }

    public async Task<IReadOnlyList<Notification>> GetUnreadAsync(Guid userId) =>
        await _context.Notifications
            .Where(x => x.UserId == userId && !x.IsRead)
            .OrderByDescending(x => x.CreatedAt)
            .Take(20)
            .ToListAsync();

    public async Task NotifyAsync(Guid userId, string title, string message, string type = "info")
    {
        _context.Notifications.Add(new Notification { UserId = userId, Title = title, Message = message, Type = type });
        await _context.SaveChangesAsync();
    }

    public async Task MarkReadAsync(Guid id, Guid userId)
    {
        var notification = await _context.Notifications.FirstOrDefaultAsync(x => x.Id == id && x.UserId == userId);
        if (notification is null)
        {
            return;
        }

        notification.IsRead = true;
        await _context.SaveChangesAsync();
    }
}

public class ReportService : IReportService
{
    private readonly ArchiveDbContext _context;

    public ReportService(ArchiveDbContext context)
    {
        _context = context;
    }

    public async Task<byte[]> ExportRequestsCsvAsync()
    {
        var rows = await _context.ArchiveRequests.Include(x => x.RequestedBy).OrderByDescending(x => x.CreatedAt).ToListAsync();
        var csv = new StringBuilder("Number,Subject,Status,Priority,Requester,CreatedAt\n");
        foreach (var row in rows)
        {
            csv.AppendLine($"{Escape(row.Number)},{Escape(row.Subject)},{row.Status},{row.Priority},{Escape(row.RequestedBy?.FullName)},{row.CreatedAt:O}");
        }

        return Encoding.UTF8.GetBytes(csv.ToString());
    }

    public async Task<byte[]> ExportDocumentsCsvAsync()
    {
        var rows = await _context.ArchiveDocuments.Include(x => x.Category).OrderByDescending(x => x.CreatedAt).ToListAsync();
        var csv = new StringBuilder("Number,Title,Category,Status,FileType,SizeBytes,CreatedAt\n");
        foreach (var row in rows)
        {
            csv.AppendLine($"{Escape(row.Number)},{Escape(row.Title)},{Escape(row.Category?.Name)},{row.Status},{row.FileType},{row.FileSizeBytes},{row.CreatedAt:O}");
        }

        return Encoding.UTF8.GetBytes(csv.ToString());
    }

    public async Task<byte[]> GenerateExecutiveReportAsync()
    {
        var documents = await _context.ArchiveDocuments.CountAsync();
        var requests = await _context.ArchiveRequests.CountAsync();
        var completed = await _context.ArchiveRequests.CountAsync(x => x.Status == RequestStatus.Completed);
        var html = $"""
        <html>
        <head><meta charset="utf-8"><title>Archive Access Report</title></head>
        <body style="font-family:Inter,Arial,sans-serif;padding:40px;color:#111827">
            <h1>Archive Access System есебі</h1>
            <p>Қалыптастырылған уақыт: {DateTimeOffset.UtcNow:yyyy-MM-dd HH:mm} UTC</p>
            <h2>KPI</h2>
            <ul>
                <li>Құжаттар: {documents}</li>
                <li>Заявкалар: {requests}</li>
                <li>Орындалған заявкалар: {completed}</li>
            </ul>
        </body>
        </html>
        """;

        return Encoding.UTF8.GetBytes(html);
    }

    private static string Escape(string? value)
    {
        value ??= string.Empty;
        return value.Contains(',') || value.Contains('"') || value.Contains('\n')
            ? $"\"{value.Replace("\"", "\"\"")}\""
            : value;
    }
}

public class LocalEmailSender : IEmailSender
{
    private readonly ILogger<LocalEmailSender> _logger;

    public LocalEmailSender(ILogger<LocalEmailSender> logger)
    {
        _logger = logger;
    }

    public Task SendAsync(string to, string subject, string body)
    {
        _logger.LogInformation("Email queued to {Recipient}: {Subject}. Body length: {Length}", to, subject, body.Length);
        return Task.CompletedTask;
    }
}
