using ArchiveSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ArchiveSystem.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var provider = scope.ServiceProvider;
        var context = provider.GetRequiredService<ArchiveDbContext>();
        var roleManager = provider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        var userManager = provider.GetRequiredService<UserManager<ApplicationUser>>();

        await context.Database.EnsureCreatedAsync();

        foreach (var role in RoleNames.All)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole<Guid>(role));
            }
        }

        var admin = await EnsureUserAsync(
            userManager,
            "admin@archive.local",
            "Archive Admin",
            "Цифрлық архив орталығы",
            RoleNames.Administrator);

        var archivist = await EnsureUserAsync(
            userManager,
            "archivist@archive.local",
            "Aruzhan Archivist",
            "Құжаттарды өңдеу бөлімі",
            RoleNames.Archivist);

        var requester = await EnsureUserAsync(
            userManager,
            "user@archive.local",
            "Dastan User",
            "Зерттеу бөлімі",
            RoleNames.User);

        if (!await context.DocumentCategories.AnyAsync())
        {
            var categories = new[]
            {
                new DocumentCategory { Name = "Тарихи қор", Description = "Ұлттық мұраға қатысты тарихи материалдар", AccentColor = "#8b5cf6" },
                new DocumentCategory { Name = "Әкімшілік құжаттар", Description = "Бұйрықтар, хаттамалар және басқару құжаттары", AccentColor = "#06b6d4" },
                new DocumentCategory { Name = "Қаржы архиві", Description = "Шарттар, есептер және қаржылық материалдар", AccentColor = "#22c55e" },
                new DocumentCategory { Name = "Фото және медиа", Description = "Сканерленген бейнелер, фотоматериалдар", AccentColor = "#f59e0b" }
            };

            context.DocumentCategories.AddRange(categories);
            await context.SaveChangesAsync();
        }

        if (!await context.ArchiveBranches.AnyAsync())
        {
            context.ArchiveBranches.AddRange(
                new ArchiveBranch { Name = "Астана орталық филиалы", Region = "Астана", Address = "Мәңгілік Ел даңғылы, 10", Latitude = 51.1282m, Longitude = 71.4304m, DocumentsCount = 18240, MonthlyRequests = 412 },
                new ArchiveBranch { Name = "Алматы қалалық архиві", Region = "Алматы", Address = "Абылай хан даңғылы, 58", Latitude = 43.2389m, Longitude = 76.8897m, DocumentsCount = 24810, MonthlyRequests = 526 },
                new ArchiveBranch { Name = "Шымкент өңірлік филиалы", Region = "Шымкент", Address = "Тәуке хан көшесі, 24", Latitude = 42.3417m, Longitude = 69.5901m, DocumentsCount = 11250, MonthlyRequests = 236 },
                new ArchiveBranch { Name = "Қарағанды архив орталығы", Region = "Қарағанды", Address = "Бейбітшілік бульвары, 12", Latitude = 49.8047m, Longitude = 73.1094m, DocumentsCount = 9370, MonthlyRequests = 184 });
        }

        if (!await context.ArchiveDocuments.AnyAsync())
        {
            var categories = await context.DocumentCategories.ToListAsync();
            var documents = new[]
            {
                CreateDocument("AAS-2026-0001", "1916 жылғы өңірлік есептер", "Тарихи өңірлік есептердің цифрлық көшірмесі", "PDF", 12400000, DocumentStatus.Active, categories[0].Id, archivist.Id),
                CreateDocument("AAS-2026-0002", "Кадрлық бұйрықтар жинағы", "Әкімшілік шешімдер мен бұйрықтар каталогы", "DOCX", 4200000, DocumentStatus.UnderReview, categories[1].Id, archivist.Id),
                CreateDocument("AAS-2026-0003", "2024 қаржылық келісімдер", "Келісімшарттар және есептік құжаттар", "XLSX", 8600000, DocumentStatus.Restricted, categories[2].Id, admin.Id),
                CreateDocument("AAS-2026-0004", "Алматы фотоқоры", "Сканерленген фотоматериалдар топтамасы", "JPG", 15400000, DocumentStatus.Archived, categories[3].Id, archivist.Id),
                CreateDocument("AAS-2026-0005", "Ұлттық кеңес хаттамалары", "Мәжіліс хаттамалары және қосымша материалдар", "PDF", 6800000, DocumentStatus.Active, categories[1].Id, admin.Id)
            };

            context.ArchiveDocuments.AddRange(documents);
            await context.SaveChangesAsync();

            foreach (var document in documents)
            {
                context.DocumentTags.AddRange(
                    new DocumentTag { ArchiveDocumentId = document.Id, Name = "цифрландырылған" },
                    new DocumentTag { ArchiveDocumentId = document.Id, Name = document.FileType.ToLowerInvariant() });
                context.DocumentVersions.Add(new DocumentVersion
                {
                    ArchiveDocumentId = document.Id,
                    CreatedById = document.UploadedById,
                    Version = "1.0",
                    ChangeNote = "Бастапқы импорт"
                });
            }
        }

        if (!await context.ArchiveRequests.AnyAsync())
        {
            var documents = await context.ArchiveDocuments.Take(3).ToListAsync();
            context.ArchiveRequests.AddRange(
                new ArchiveRequest { Number = "REQ-2026-0001", Subject = "Тарихи есептің көшірмесін алу", Description = "Ғылыми жұмыс үшін PDF көшірме қажет.", Priority = RequestPriority.High, Status = RequestStatus.InProgress, RequestedById = requester.Id, ArchiveDocumentId = documents[0].Id, DueAt = DateTimeOffset.UtcNow.AddDays(3) },
                new ArchiveRequest { Number = "REQ-2026-0002", Subject = "Қаржы келісімін тексеру", Description = "Рұқсат деңгейін растау қажет.", Priority = RequestPriority.Normal, Status = RequestStatus.WaitingForUser, RequestedById = requester.Id, ArchiveDocumentId = documents[2].Id, DueAt = DateTimeOffset.UtcNow.AddDays(5) },
                new ArchiveRequest { Number = "REQ-2026-0003", Subject = "Фотоқордан материал іздеу", Description = "Алматы қаласының 1980 жылғы суреттері керек.", Priority = RequestPriority.Low, Status = RequestStatus.Completed, RequestedById = requester.Id, ArchiveDocumentId = documents[1].Id, ClosedAt = DateTimeOffset.UtcNow.AddDays(-1) });
        }

        if (!await context.SystemSettings.AnyAsync())
        {
            context.SystemSettings.AddRange(
                new SystemSetting { Key = "RetentionPolicyYears", Value = "25", Description = "Құжаттарды сақтау мерзімі" },
                new SystemSetting { Key = "MaxUploadMb", Value = "100", Description = "Жүктелетін файлдың ең үлкен көлемі" },
                new SystemSetting { Key = "Notifications.EmailEnabled", Value = "true", Description = "Email хабарламаларын қосу" });
        }

        if (!await context.AuditLogs.AnyAsync())
        {
            context.AuditLogs.AddRange(
                new AuditLog { UserId = admin.Id, Action = "Жүйеге кіру", EntityName = "Auth", Details = "Әкімші сәтті кірді", IpAddress = "127.0.0.1" },
                new AuditLog { UserId = archivist.Id, Action = "Құжат жүктеу", EntityName = "ArchiveDocument", Details = "Жаңа құжат импортталды", IpAddress = "127.0.0.1" },
                new AuditLog { UserId = requester.Id, Action = "Заявка құру", EntityName = "ArchiveRequest", Details = "Пайдаланушы архивтік сұрау жіберді", IpAddress = "127.0.0.1" });
        }

        if (!await context.Notifications.AnyAsync())
        {
            context.Notifications.AddRange(
                new Notification { UserId = admin.Id, Title = "Жүйе белсенді", Message = "Archive Access System production режиміне дайын.", Type = "success" },
                new Notification { UserId = requester.Id, Title = "Заявка жаңартылды", Message = "REQ-2026-0001 өңделуде.", Type = "info" });
        }

        await context.SaveChangesAsync();
    }

    private static async Task<ApplicationUser> EnsureUserAsync(
        UserManager<ApplicationUser> userManager,
        string email,
        string fullName,
        string department,
        string role)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user is null)
        {
            user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true,
                FullName = fullName,
                Department = department
            };

            var result = await userManager.CreateAsync(user, "Archive#2026");
            if (!result.Succeeded)
            {
                throw new InvalidOperationException(string.Join("; ", result.Errors.Select(x => x.Description)));
            }
        }

        if (!await userManager.IsInRoleAsync(user, role))
        {
            await userManager.AddToRoleAsync(user, role);
        }

        return user;
    }

    private static ArchiveDocument CreateDocument(
        string number,
        string title,
        string description,
        string fileType,
        long fileSize,
        DocumentStatus status,
        Guid categoryId,
        Guid uploadedById) =>
        new()
        {
            Number = number,
            Title = title,
            Description = description,
            FileType = fileType,
            FilePath = $"/uploads/{number}.{fileType.ToLowerInvariant()}",
            FileSizeBytes = fileSize,
            Status = status,
            CategoryId = categoryId,
            UploadedById = uploadedById,
            CreatedAt = DateTimeOffset.UtcNow.AddDays(Random.Shared.Next(-60, -2)),
            UpdatedAt = DateTimeOffset.UtcNow.AddDays(Random.Shared.Next(-2, 1))
        };
}
