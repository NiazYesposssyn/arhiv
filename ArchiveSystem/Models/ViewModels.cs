using System.ComponentModel.DataAnnotations;

namespace ArchiveSystem.Models;

public record KpiCard(string Label, string Value, string Trend, string Icon, string Accent);
public record ChartPoint(string Label, int Value);
public record BranchMetric(string Name, string Region, int Documents, int Requests, decimal Latitude, decimal Longitude);

public class DashboardViewModel
{
    public int TotalDocuments { get; set; }
    public int TotalUsers { get; set; }
    public int OpenRequests { get; set; }
    public int CompletedRequests { get; set; }
    public IReadOnlyList<KpiCard> Kpis { get; set; } = [];
    public IReadOnlyList<ChartPoint> DocumentsByMonth { get; set; } = [];
    public IReadOnlyList<ChartPoint> RequestsByStatus { get; set; } = [];
    public IReadOnlyList<ArchiveDocument> RecentDocuments { get; set; } = [];
    public IReadOnlyList<ArchiveRequest> RecentRequests { get; set; } = [];
    public IReadOnlyList<AuditLog> AuditLogs { get; set; } = [];
    public IReadOnlyList<Notification> Notifications { get; set; } = [];
}

public class DocumentIndexViewModel
{
    public string? Search { get; set; }
    public Guid? CategoryId { get; set; }
    public DocumentStatus? Status { get; set; }
    public IReadOnlyList<DocumentCategory> Categories { get; set; } = [];
    public IReadOnlyList<ArchiveDocument> Documents { get; set; } = [];
}

public class DocumentUploadViewModel
{
    [Required(ErrorMessage = "Құжат атауын енгізіңіз")]
    [MaxLength(240)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [Required(ErrorMessage = "Санатты таңдаңыз")]
    public Guid CategoryId { get; set; }

    [MaxLength(300)]
    public string Tags { get; set; } = string.Empty;

    public IFormFile? File { get; set; }
    public IReadOnlyList<DocumentCategory> Categories { get; set; } = [];
}

public class RequestIndexViewModel
{
    public string? Search { get; set; }
    public RequestStatus? Status { get; set; }
    public IReadOnlyList<ArchiveRequest> Requests { get; set; } = [];
}

public class RequestCreateViewModel
{
    [Required(ErrorMessage = "Тақырыпты енгізіңіз")]
    [MaxLength(220)]
    public string Subject { get; set; } = string.Empty;

    [Required(ErrorMessage = "Сипаттаманы енгізіңіз")]
    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    public RequestPriority Priority { get; set; } = RequestPriority.Normal;
    public Guid? ArchiveDocumentId { get; set; }
    public IReadOnlyList<ArchiveDocument> Documents { get; set; } = [];
}

public class AnalyticsViewModel
{
    public IReadOnlyList<KpiCard> Kpis { get; set; } = [];
    public IReadOnlyList<ChartPoint> DocumentsByCategory { get; set; } = [];
    public IReadOnlyList<ChartPoint> RequestsByRegion { get; set; } = [];
    public IReadOnlyList<ChartPoint> ActivityHeatmap { get; set; } = [];
    public IReadOnlyList<BranchMetric> Branches { get; set; } = [];
}

public class LoginViewModel
{
    [Required(ErrorMessage = "Email енгізіңіз")]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Құпиясөз енгізіңіз")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    public bool RememberMe { get; set; }
}

public class RegisterViewModel
{
    [Required(ErrorMessage = "Аты-жөніңізді енгізіңіз")]
    [MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email енгізіңіз")]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Бөлімді енгізіңіз")]
    [MaxLength(120)]
    public string Department { get; set; } = string.Empty;

    [Required(ErrorMessage = "Құпиясөз енгізіңіз")]
    [DataType(DataType.Password)]
    [MinLength(8)]
    public string Password { get; set; } = string.Empty;

    [Compare(nameof(Password), ErrorMessage = "Құпиясөздер сәйкес емес")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = string.Empty;
}

public class TwoFactorViewModel
{
    [Required(ErrorMessage = "Кодты енгізіңіз")]
    [MaxLength(8)]
    public string Code { get; set; } = string.Empty;

    public bool RememberMachine { get; set; }
}

public class ForgotPasswordViewModel
{
    [Required(ErrorMessage = "Email енгізіңіз")]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}

public class ProfileViewModel
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string PreferredLanguage { get; set; } = "kk-KZ";
    public bool TwoFactorEnabled { get; set; }
    public IReadOnlyList<AuditLog> RecentActivity { get; set; } = [];
}

public class UsersManagementViewModel
{
    public IReadOnlyList<ApplicationUser> Users { get; set; } = [];
    public IReadOnlyDictionary<Guid, IList<string>> Roles { get; set; } = new Dictionary<Guid, IList<string>>();
}
