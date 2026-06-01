#!/usr/bin/env python3
"""Remove Lovable / AI branding from index.html after sync."""
from pathlib import Path
import re

INDEX = Path(__file__).resolve().parent.parent / "index.html"


def clean(html: str) -> str:
    # Lovable badge block (styles + aside + script)
    html = re.sub(
        r"<style>\s*\n\s*@font-face\s*\{\s*\n\s*font-family:\s*'CameraPlainVariable'.*?</script>\s*",
        "",
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(r'<aside[^>]*id="lovable-badge"[^>]*>.*?</aside>\s*', "", html, flags=re.DOTALL)
    html = re.sub(r"<span id=\"lovable-badge-divider\".*?</script>\s*", "", html, flags=re.DOTALL)
    html = re.sub(
        r"<script>\s*// Don't show the lovable-badge.*?</script>\s*",
        "",
        html,
        flags=re.DOTALL | re.IGNORECASE,
    )

    # Floating AI chat launcher from SSR HTML
    html = re.sub(
        r'<button aria-label="AI Ассистент"[^>]*>.*?</button>',
        "",
        html,
        flags=re.DOTALL,
    )

    # og:image URLs that mention lovable in CDN path
    html = html.replace(".lovable.app-", ".archive-vko-")
    html = re.sub(
        r'content="https://pub-bb2e103a32db4e198524a2e9ed8f35b4\.r2\.dev/[^"]*"',
        'content="/assets/archive-hero-CSYhkv1i.jpg"',
        html,
    )

    if "site-overrides.css" not in html:
        html = html.replace(
            'href="/assets/styles-DFqBsZPj.css"',
            'href="/assets/styles-DFqBsZPj.css"/><link rel="stylesheet" href="/assets/site-overrides.css"',
            1,
        )

    return html


def main() -> None:
    text = INDEX.read_text(encoding="utf-8")
    INDEX.write_text(clean(text), encoding="utf-8")
    print(f"Cleaned {INDEX}")


if __name__ == "__main__":
    main()
