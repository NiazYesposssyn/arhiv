#!/usr/bin/env node
/**
 * Локальный сервер ЦГА ВКО — без Lovable.
 * Статика + SPA + локальные /_serverFn и /api.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleServerFn } from "./api/server-fn.mjs";
import { createRequest } from "./api/requests-api.mjs";
import { loadEnv } from "./api/load-env.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envLoad = loadEnv(__dirname);

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 8080);

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

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function handleApi(req, res, pathname) {
  if (pathname === "/api/requests" && req.method === "POST") {
    try {
      const payload = await readBody(req);
      const result = await createRequest(payload);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    }
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not found" }));
}

async function handle(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);

  const fnMatch = pathname.match(/^\/_serverFn\/([a-f0-9]+)$/);
  if (fnMatch) {
    const out = await handleServerFn(fnMatch[1], req);
    res.writeHead(out.status, out.headers);
    res.end(out.body);
    return;
  }

  if (pathname.startsWith("/api/")) {
    return handleApi(req, res, pathname);
  }

  let filePath = path.join(ROOT, pathname);
  if (pathname.endsWith("/")) filePath = path.join(filePath, "index.html");

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, filePath);
  }

  const indexPath = path.join(ROOT, "index.html");
  if (fs.existsSync(indexPath)) return sendFile(res, indexPath);

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

const server = http.createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal error");
  });
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Порт ${PORT} уже занят (сервер, возможно, уже запущен).`);
    console.error(`  Откройте в браузере: http://127.0.0.1:${PORT}/`);
    console.error("  Или закройте другой терминал с npm start / node server.mjs");
    console.error(`  Или в .env задайте другой PORT=8081 и снова: npm start`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`ЦГА ВКО (локально, без Lovable): http://127.0.0.1:${PORT}/`);
  console.log(`   .env: ${envLoad.count} переменных (${envLoad.path})`);
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log("⚠  SUPABASE_SERVICE_ROLE_KEY не прочитан.");
    console.log("   Сохраните .env как UTF-8 (в Cursor: внизу справа → UTF-8).");
  } else {
    console.log("   Supabase service_role: OK");
  }
});
