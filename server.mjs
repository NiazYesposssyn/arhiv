#!/usr/bin/env node
/**
 * Local/production server for ЦГА ВКО mirror.
 * - Static files + SPA fallback
 * - Proxies /_serverFn/* to Lovable (admin panel, staff login, etc.)
 */
import http from "node:http";
import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8080);
const LOVABLE_ORIGIN = process.env.LOVABLE_ORIGIN || "https://continue-our-site.lovable.app";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function proxyToLovable(req, res) {
  const target = new URL(req.url, LOVABLE_ORIGIN);
  const headers = { ...req.headers, host: target.host };
  delete headers["host"];
  headers.host = target.host;

  const proxyReq = https.request(
    target,
    { method: req.method, headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on("error", (err) => {
    res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`Proxy error: ${err.message}`);
  });

  req.pipe(proxyReq);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME[ext] || "application/octet-stream";
  const stream = fs.createReadStream(filePath);
  stream.on("error", () => {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  });
  stream.on("open", () => {
    res.writeHead(200, { "Content-Type": type });
    stream.pipe(res);
  });
}

function handle(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);

  if (pathname.startsWith("/_serverFn/")) {
    return proxyToLovable(req, res);
  }

  if (pathname.startsWith("/api/")) {
    return proxyToLovable(req, res);
  }

  let filePath = path.join(ROOT, pathname);
  if (pathname.endsWith("/")) {
    filePath = path.join(filePath, "index.html");
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, filePath);
  }

  const indexPath = path.join(ROOT, "index.html");
  if (fs.existsSync(indexPath)) {
    return sendFile(res, indexPath);
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

const server = http.createServer(handle);
server.listen(PORT, "0.0.0.0", () => {
  console.log(`ЦГА ВКО: http://127.0.0.1:${PORT}/`);
  console.log(`Server functions proxied to ${LOVABLE_ORIGIN}`);
});
