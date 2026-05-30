using ArchiveSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ArchiveSystem.Data;

public class ArchiveDbContext : IdentityDbContext<ApplicationUser, IdentityRole<Guid>, Guid>
{
    public ArchiveDbContext(DbContextOptions<ArchiveDbContext> options) : base(options)
    {
    }

    public DbSet<DocumentCategory> DocumentCategories => Set<DocumentCategory>();
    public DbSet<ArchiveDocument> ArchiveDocuments => Set<ArchiveDocument>();
    public DbSet<DocumentTag> DocumentTags => Set<DocumentTag>();
    public DbSet<DocumentVersion> DocumentVersions => Set<DocumentVersion>();
    public DbSet<ArchiveRequest> ArchiveRequests => Set<ArchiveRequest>();
    public DbSet<RequestComment> RequestComments => Set<RequestComment>();
    public DbSet<ArchiveBranch> ArchiveBranches => Set<ArchiveBranch>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<SystemSetting> SystemSettings => Set<SystemSetting>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>(entity =>
        {
            entity.Property(x => x.FullName).HasMaxLength(120);
            entity.Property(x => x.Department).HasMaxLength(120);
            entity.HasIndex(x => x.Email).IsUnique();
        });

        builder.Entity<DocumentCategory>()
            .HasIndex(x => x.Name)
            .IsUnique();

        builder.Entity<ArchiveDocument>(entity =>
        {
            entity.HasIndex(x => x.Number).IsUnique();
            entity.HasIndex(x => x.Title);
            entity.HasOne(x => x.Category)
                .WithMany(x => x.Documents)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(x => x.UploadedBy)
                .WithMany(x => x.UploadedDocuments)
                .HasForeignKey(x => x.UploadedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<DocumentTag>(entity =>
        {
            entity.HasIndex(x => new { x.ArchiveDocumentId, x.Name }).IsUnique();
            entity.HasOne(x => x.ArchiveDocument)
                .WithMany(x => x.Tags)
                .HasForeignKey(x => x.ArchiveDocumentId);
        });

        builder.Entity<DocumentVersion>(entity =>
        {
            entity.HasOne(x => x.ArchiveDocument)
                .WithMany(x => x.Versions)
                .HasForeignKey(x => x.ArchiveDocumentId);
            entity.HasOne(x => x.CreatedBy)
                .WithMany()
                .HasForeignKey(x => x.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<ArchiveRequest>(entity =>
        {
            entity.HasIndex(x => x.Number).IsUnique();
            entity.HasOne(x => x.RequestedBy)
                .WithMany(x => x.Requests)
                .HasForeignKey(x => x.RequestedById)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(x => x.ArchiveDocument)
                .WithMany(x => x.Requests)
                .HasForeignKey(x => x.ArchiveDocumentId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        builder.Entity<RequestComment>(entity =>
        {
            entity.HasOne(x => x.ArchiveRequest)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.ArchiveRequestId);
            entity.HasOne(x => x.Author)
                .WithMany()
                .HasForeignKey(x => x.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        builder.Entity<AuditLog>(entity =>
        {
            entity.HasIndex(x => x.CreatedAt);
            entity.HasOne(x => x.User)
                .WithMany(x => x.AuditLogs)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        builder.Entity<Notification>(entity =>
        {
            entity.HasIndex(x => new { x.UserId, x.IsRead });
            entity.HasOne(x => x.User)
                .WithMany(x => x.Notifications)
                .HasForeignKey(x => x.UserId);
        });

        builder.Entity<ArchiveBranch>(entity =>
        {
            entity.Property(x => x.Latitude).HasPrecision(10, 7);
            entity.Property(x => x.Longitude).HasPrecision(10, 7);
        });

        builder.Entity<SystemSetting>()
            .HasIndex(x => x.Key)
            .IsUnique();
    }
}
