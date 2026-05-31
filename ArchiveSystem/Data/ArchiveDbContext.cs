using ArchiveSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace ArchiveSystem.Data;

public sealed class ArchiveDbContext(DbContextOptions<ArchiveDbContext> options) : DbContext(options)
{
    public DbSet<ApplicationUser> Users => Set<ApplicationUser>();

    public DbSet<ArchiveDocument> Documents => Set<ArchiveDocument>();

    public DbSet<ArchiveRequest> Requests => Set<ArchiveRequest>();

    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    public DbSet<UserNotification> Notifications => Set<UserNotification>();

    public DbSet<BackupJob> BackupJobs => Set<BackupJob>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ApplicationUser>()
            .HasIndex(user => user.Email)
            .IsUnique();

        modelBuilder.Entity<ArchiveDocument>()
            .HasIndex(document => document.DocumentNumber)
            .IsUnique();

        modelBuilder.Entity<ArchiveRequest>()
            .HasIndex(request => request.RequestNumber)
            .IsUnique();

        modelBuilder.Entity<ArchiveDocument>()
            .Property(document => document.Status)
            .HasConversion<string>();

        modelBuilder.Entity<ArchiveRequest>()
            .Property(request => request.Status)
            .HasConversion<string>();

        modelBuilder.Entity<ApplicationUser>().HasData(
            new ApplicationUser
            {
                Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                FullName = "AAS Administrator",
                Email = "admin@archive.kz",
                Role = "Администратор",
                TwoFactorEnabled = true,
                CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            },
            new ApplicationUser
            {
                Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                FullName = "Archive Operator",
                Email = "operator@archive.kz",
                Role = "Архивариус",
                CreatedAt = new DateTime(2026, 1, 2, 0, 0, 0, DateTimeKind.Utc)
            });
    }
}
