# Archive Access System

Premium ASP.NET Core MVC web system for archive document management, online requests, analytics, security and REST API integrations.

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

## Development

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