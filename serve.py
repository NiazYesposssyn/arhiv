#!/usr/bin/env python3
"""Local dev server with SPA fallback (like Lovable hosting)."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
ASSET_PREFIXES = ("/assets/",)


class SPAHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        file_path = ROOT / path.lstrip("/")
        if path != "/" and not any(path.startswith(p) for p in ASSET_PREFIXES):
            if not file_path.is_file():
                self.path = "/index.html"
        return super().do_GET()


if __name__ == "__main__":
    port = 8080
    with ThreadingHTTPServer(("127.0.0.1", port), SPAHandler) as httpd:
        print(f"Serving ЦГА ВКО mirror at http://127.0.0.1:{port}/")
        httpd.serve_forever()
