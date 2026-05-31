using System.ComponentModel.DataAnnotations;

namespace ArchiveSystem.Models;

public enum DocumentStatus
{
    Draft,
    Active,
    Archived,
    Restricted
}

public enum RequestStatus
{
    New,
    InReview,
    Processing,
    Completed,
    Rejected
}

public sealed class ApplicationUser
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(160)]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(160)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(64)]
    public string Role { get; set; } = "Пользователь";

    public bool TwoFactorEnabled { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public sealed class ArchiveDocument
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(32)]
    public string DocumentNumber { get; set; } = string.Empty;

    [MaxLength(240)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(32)]
    public string FileType { get; set; } = string.Empty;

    [MaxLength(128)]
    public string Category { get; set; } = string.Empty;

    [MaxLength(128)]
    public string Region { get; set; } = string.Empty;

    public long FileSize { get; set; }

    public DocumentStatus Status { get; set; } = DocumentStatus.Active;

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public Guid? UploadedById { get; set; }

    public ApplicationUser? UploadedBy { get; set; }
}

public sealed class ArchiveRequest
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(32)]
    public string RequestNumber { get; set; } = string.Empty;

    [MaxLength(200)]
    public string Subject { get; set; } = string.Empty;

    [MaxLength(128)]
    public string ApplicantName { get; set; } = string.Empty;

    [MaxLength(160)]
    public string ApplicantEmail { get; set; } = string.Empty;

    [MaxLength(128)]
    public string Region { get; set; } = string.Empty;

    public RequestStatus Status { get; set; } = RequestStatus.New;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? CompletedAt { get; set; }

    [MaxLength(1000)]
    public string? AdminComment { get; set; }
}

public sealed class AuditLog
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(160)]
    public string Actor { get; set; } = string.Empty;

    [MaxLength(160)]
    public string Action { get; set; } = string.Empty;

    [MaxLength(80)]
    public string EntityType { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [MaxLength(64)]
    public string IpAddress { get; set; } = string.Empty;
}

public sealed class UserNotification
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(160)]
    public string Title { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Message { get; set; } = string.Empty;

    public bool IsRead { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public sealed class BackupJob
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [MaxLength(120)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(32)]
    public string Status { get; set; } = "Scheduled";

    public DateTime ScheduledAt { get; set; } = DateTime.UtcNow;

    public DateTime? FinishedAt { get; set; }
}
