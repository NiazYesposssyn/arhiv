#!/usr/bin/env bash
# Refresh static bundle from published Lovable site.
set -euo pipefail
BASE="${LOVABLE_ORIGIN:-https://continue-our-site.lovable.app}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS=(
  index-C46ps1kB.js index-BtScwlPl.js styles-DFqBsZPj.css
  archive-hero-CSYhkv1i.jpg digital-LOgLbsQk.jpg documents-BcghR4rD.jpg
  about-Wt7Y0mEa.js admin.functions-DDAxqYXr.js admin-mtIU5XsI.js apply._slug-DpIjM1XC.js
  arrow-left-DZSWq45P.js arrow-right-Bdgjmsrj.js auth-CLgKWo0p.js
  calendar-BH3CfKC0.js circle-check-BB-jyxue.js clock-ByxKzzcm.js
  collections-Cumac3vQ.js contact-D-eBnU4l.js digital-DjHDPGtn.js
  download-zFzerfLx.js list-checks-CSOiLvL1.js loader-circle-Bfw85RxM.js
  lock-WWFqCGXM.js map-DOYaGNPf.js PageHeader-BRFBi8pT.js
  services.index-CiotmFgH.js services._slug-BDxi8hch.js services._slug-BGXDex-w.js services._slug-D4Om0qhl.js
  shield-check-n-lz6iI4.js SiteFooter-DwMlEjEN.js staff-B2JaDWG1.js sun-D7UhJT9_.js wallet-BvGB-JEd.js
  ArchiveMapInner-BYJo7KYO.js ArchiveMapInner-CIGW-MKW.css
)

echo "Downloading index from $BASE"
curl -fsSL "$BASE/" -o "$ROOT/index.html"

mkdir -p "$ROOT/assets"
for f in "${ASSETS[@]}"; do
  echo "  assets/$f"
  curl -fsSL "$BASE/assets/$f" -o "$ROOT/assets/$f"
done

echo "Done. Run: npm start"
