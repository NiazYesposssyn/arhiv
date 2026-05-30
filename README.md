# Archive Access System

Enterprise-level ASP.NET Core MVC platform for archive document management, request processing, audit trails, analytics, and secure role-based access.


## Instant preview

For the easiest visual preview, open this file directly in a browser:

```text
index.html
```

It is a standalone premium demo interface for the topic:

> Проектирование системы управления доступом к архивной информации и обработки пользовательских запросов

The demo does not need .NET, PostgreSQL, terminal commands, or ports. It includes:

- Kazakh, Russian, and English language switching
- Dark and light modes
- Dashboard, documents, requests, access roles, analytics, map, notifications, profile, and settings
- Working navigation, filters, modals, toast notifications, CSV export, request approval/rejection, and demo record creation

## Stack

- ASP.NET Core MVC (.NET 9)
- PostgreSQL + Entity Framework Core
- ASP.NET Core Identity roles: `Администратор`, `Архивариус`, `Пайдаланушы`
- JWT authentication endpoint for integrations
- Bootstrap, Tailwind CDN utilities, Chart.js, Bootstrap Icons
- Light/dark glassmorphism UI with Kazakh-first interface and culture switcher

## Quick start

1. Install .NET SDK 9+ and PostgreSQL.
2. Create database credentials matching `ArchiveSystem/appsettings.json` or override `ConnectionStrings:DefaultConnection`.
3. Run:

```bash
dotnet restore сайт.sln
dotnet run --project ArchiveSystem/ArchiveSystem.csproj
```

Seeded demo accounts:

- `admin@archive.local` / `Archive#2026`
- `archivist@archive.local` / `Archive#2026`
- `user@archive.local` / `Archive#2026`

## Features

- Premium dashboard with KPI cards, activity timeline, Chart.js graphs
- Secure authentication, password recovery flow, 2FA-ready Identity setup, JWT token endpoint
- Role-protected document upload, filtering, tags, version history, archive status
- Request lifecycle management with comments, notifications, exports
- Analytics page with branch map visualization, regional stats, heatmap charts
- Admin users management, settings, audit logs, notification center, profile page