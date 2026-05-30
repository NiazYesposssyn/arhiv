# AGENTS.md

## Cursor Cloud specific instructions

### Repository shape

This repo is a minimal archive snapshot (`arhiv`). Checked-in artifacts:

- `сайт.sln` — Visual Studio 17 solution for **ArchiveSystem** (`ArchiveSystem/ArchiveSystem.csproj`)
- `Untitled-1.html` — standalone static HTML (not wired to the .NET solution)
- `README.md` — title only; no setup docs

The **ArchiveSystem** project directory is **not** in the tree. `dotnet build сайт.sln` fails with MSB3202 until that project is added.

There are no `package.json`, Docker compose files, Python requirements, CI configs, or automated lint/test scripts in the repo.

### Toolchain (VM)

- **.NET SDK 8** is installed under `$HOME/.dotnet` (not system-wide). Ensure it is on `PATH`:
  - `export PATH="$HOME/.dotnet:$PATH"` (also appended to `~/.bashrc` on this VM)
- **Python 3** is available for serving static files.

### Build (when project exists)

```bash
export PATH="$HOME/.dotnet:$PATH"
dotnet build сайт.sln
dotnet run --project ArchiveSystem/ArchiveSystem.csproj
```

Until `ArchiveSystem/` is present, only static HTML can be exercised.

### Run static HTML (current smoke test)

Serve the repo root and open the placeholder page:

```bash
python3 -m http.server 8080
```

Then visit `http://127.0.0.1:8080/Untitled-1.html` (browser tab title: `fkfkfkff`).

Prefer a tmux session for long-running servers (see cloud agent tmux conventions).

### Lint / tests

No lint or test commands are defined in this repository. Skip unless new tooling is added.
