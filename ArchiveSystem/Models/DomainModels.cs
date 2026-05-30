using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ArchiveSystem.Models;

public static class RoleNames
{
    public const string Administrator = "Администратор";
    public const string Archivist = "Архивариус";
    public const string User = "Пайдаланушы";

    public static readonly string[] All = [Administrator, Archivist, User];
}

public class ApplicationUser : IdentityUser<Guid>
{
    [MaxLength(120)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(120)]
    public string Department { get; set; } = "Жалпы бөлім";

    [MaxLength(32)]
    public string PreferredLanguage { get; set; } = "kk-KZ";

    [MaxLength(256)]
    public string? AvatarUrl { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? LastLoginAt { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<ArchiveDocument> UploadedDocuments { get; set; } = [];
    public ICollection<ArchiveRequest> Requests { get; set; } = [];
    public ICollection<AuditLog> AuditLogs { get; set; } = [];
    public ICollection<Notification> Notifications { get; set; } = [];
}

public enum DocumentStatus
{
    Draft = 0,
    Active = 1,
    UnderReview = 2,
    Archived = 3,
    Restricted = 4
}

public enum RequestStatus
{
    New = 0,
    InProgress = 1,
    WaitingForUser = 2,
    Approved = 3,
    Rejected = 4,
    Completed = 5
}

public enum RequestPriority
{
    Low = 0,
    Normal = 1,
    High = 2,
    Critical = 3
}

public class DocumentCategory
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    [MaxLength(24)]
    public string AccentColor { get; set; } = "#6366f1";

    public ICollection<ArchiveDocument> Documents { get; set; } = [];
}

public class ArchiveDocument
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(40)]
    public string Number { get; set; } = string.Empty;

    [MaxLength(240)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string? Description { get; set; }

    [MaxLength(20)]
    public string FileType { get; set; } = "PDF";

    [MaxLength(512)]
    public string FilePath { get; set; } = string.Empty;

    public long FileSizeBytes { get; set; }
    public DocumentStatus Status { get; set; } = DocumentStatus.Active;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ArchivedAt { get; set; }
    public Guid CategoryId { get; set; }
    public DocumentCategory? Category { get; set; }
    public Guid UploadedById { get; set; }
    public ApplicationUser? UploadedBy { get; set; }
    public ICollection<DocumentTag> Tags { get; set; } = [];
    public ICollection<DocumentVersion> Versions { get; set; } = [];
    public ICollection<ArchiveRequest> Requests { get; set; } = [];
}

public class DocumentTag
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(64)]
    public string Name { get; set; } = string.Empty;

    public Guid ArchiveDocumentId { get; set; }
    public ArchiveDocument? ArchiveDocument { get; set; }
}

public class DocumentVersion
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ArchiveDocumentId { get; set; }
    public ArchiveDocument? ArchiveDocument { get; set; }

    [MaxLength(24)]
    public string Version { get; set; } = "1.0";

    [MaxLength(500)]
    public string ChangeNote { get; set; } = "Бастапқы жүктеу";

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public Guid CreatedById { get; set; }
    public ApplicationUser? CreatedBy { get; set; }
}

public class ArchiveRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(40)]
    public string Number { get; set; } = string.Empty;

    [MaxLength(220)]
    public string Subject { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;

    public RequestStatus Status { get; set; } = RequestStatus.New;
    public RequestPriority Priority { get; set; } = RequestPriority.Normal;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? DueAt { get; set; }
    public DateTimeOffset? ClosedAt { get; set; }
    public Guid RequestedById { get; set; }
    public ApplicationUser? RequestedBy { get; set; }
    public Guid? ArchiveDocumentId { get; set; }
    public ArchiveDocument? ArchiveDocument { get; set; }
    public ICollection<RequestComment> Comments { get; set; } = [];
}

public class RequestComment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ArchiveRequestId { get; set; }
    public ArchiveRequest? ArchiveRequest { get; set; }
    public Guid AuthorId { get; set; }
    public ApplicationUser? Author { get; set; }

    [MaxLength(1200)]
    public string Message { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public bool IsInternal { get; set; }
}

public class ArchiveBranch
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(160)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(120)]
    public string Region { get; set; } = string.Empty;

    [MaxLength(220)]
    public string Address { get; set; } = string.Empty;

    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int DocumentsCount { get; set; }
    public int MonthlyRequests { get; set; }
}

public class AuditLog
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid? UserId { get; set; }
    public ApplicationUser? User { get; set; }

    [MaxLength(80)]
    public string Action { get; set; } = string.Empty;

    [MaxLength(120)]
    public string EntityName { get; set; } = string.Empty;

    [MaxLength(80)]
    public string? EntityId { get; set; }

    [MaxLength(64)]
    public string? IpAddress { get; set; }

    [MaxLength(512)]
    public string Details { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class Notification
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public ApplicationUser? User { get; set; }

    [MaxLength(160)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(600)]
    public string Message { get; set; } = string.Empty;

    [MaxLength(40)]
    public string Type { get; set; } = "info";

    public bool IsRead { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
}

public class SystemSetting
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(120)]
    public string Key { get; set; } = string.Empty;

    [MaxLength(2000)]
    public string Value { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }
}
