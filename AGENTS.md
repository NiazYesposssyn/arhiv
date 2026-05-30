# AGENTS.md

## Cursor Cloud specific instructions

### Repository shape

- **`main`** currently contains only `сайт.sln`, `README.md`, and `Untitled-1.html`. The solution references `ArchiveSystem/ArchiveSystem.csproj`, but that folder is **not** on `main`, so `dotnet build` fails there with MSB3202.
- The full **Archive Access System** ASP.NET Core MVC app lives on branch `cursor/archive-access-system-1457` (and matching local branch `cursor/dev-env-setup-9851` when checked out for cloud setup). Use that branch for build/run/login workflows.
- `Untitled-1.html` is a standalone static placeholder and is not part of the .NET app.

### Services (end-to-end)

| Service | Required? | Notes |
|--------|-----------|--------|
| PostgreSQL 16 (`archive_access_system` DB) | **Yes** (for ArchiveSystem) | Default connection in `ArchiveSystem/appsettings.json`: `Host=localhost;Port=5432;Database=archive_access_system;Username=postgres;Password=postgres` |
| ArchiveSystem (Kestrel) | **Yes** | Dev URLs: `http://localhost:5147` (also bound to `0.0.0.0:5147` in cloud demos) |
| Static HTTP server | Optional | Only for `Untitled-1.html` on `main` |

### Toolchain (VM)

- **.NET SDK 9** is installed under `$HOME/.dotnet` (not always on default `PATH`). Use `export PATH="$HOME/.dotnet:$PATH"` in interactive shells, or invoke `"$HOME/.dotnet/dotnet"` directly.
- **PostgreSQL** must be running before `dotnet run`. In this VM: `sudo service postgresql start`, then ensure DB exists (`createdb archive_access_system` as `postgres` user if needed).

### Commands (ArchiveSystem branch)

See `README.md` on `cursor/archive-access-system-1457` for feature overview. Standard commands:

```bash
export PATH="$HOME/.dotnet:$PATH"
dotnet restore сайт.sln
dotnet build сайт.sln
dotnet run --project ArchiveSystem/ArchiveSystem.csproj --urls "http://0.0.0.0:5147"
```

**Seeded demo login:** `admin@archive.local` / `Archive#2026` (also `archivist@archive.local` and `user@archive.local` with the same password).

Use a **tmux** session for long-running `dotnet run` (cloud agent convention).

### Lint / tests

- No test projects or CI lint scripts are checked in. `dotnet test сайт.sln` restores only.
- `dotnet format` may fail on the Cyrillic solution filename (`сайт.sln`); prefer formatting the project: `dotnet format ArchiveSystem/ArchiveSystem.csproj`.

### `main`-only smoke test

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/Untitled-1.html`.
