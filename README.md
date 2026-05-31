# Archive Access System

Premium archive web system for document management, online requests, analytics, security and REST API integrations.

The repository contains two versions:

1. Static HTML version in the repository root.
2. ASP.NET Core MVC version in `ArchiveSystem/`.

## Quick start for HTML version

Run this from the repository root:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080
```

Main HTML files:

- `index.html`
- `archive.html`
- `services.html`
- `pricing.html`
- `dashboard.html`
- `documents.html`
- `requests.html`
- `analytics.html`

## Stack

- ASP.NET Core MVC (.NET 8)
- PostgreSQL
- Entity Framework Core
- JWT Authentication for REST API
- Cookie authentication for the MVC console
- Bootstrap 5
- Chart.js
- Responsive glassmorphism UI with light/dark theme

## Main sections

Public pages:

- Home
- About system
- Archive information
- Services
- Pricing
- News
- FAQ
- Contacts
- Help Center
- Privacy Policy

Authenticated console:

- Dashboard
- Documents
- Requests
- Analytics
- Users
- Roles
- Audit Logs
- Notifications
- Reports
- Settings
- Profile
- Support Center
- API Documentation
- Backups
- Security Center

## ASP.NET Core development

Configure PostgreSQL in `ArchiveSystem/appsettings.json`, then run:

```bash
dotnet restore
dotnet run --project ArchiveSystem/ArchiveSystem.csproj
```

Demo login:

- `admin@archive.kz`
- any password

JWT token endpoint:

```http
POST /api/auth/token
```