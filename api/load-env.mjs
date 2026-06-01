import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

/**
 * Надёжная загрузка .env на Windows (UTF-8 / UTF-16 / BOM).
 * Ищет .env в папке сервера и на уровень выше (частая ошибка с вложенными папками).
 */
export function loadEnv(rootDir) {
  const candidates = [
    path.join(rootDir, ".env"),
    path.join(rootDir, ".env.local"),
    path.join(rootDir, "..", ".env"),
  ];

  let total = 0;
  const loaded = [];

  for (const envPath of candidates) {
    if (!fs.existsSync(envPath)) continue;
    const n = applyEnvFile(envPath);
    if (n > 0) {
      total += n;
      loaded.push(envPath);
    }
  }

  if (total === 0) {
    console.warn("⚠  .env не найден или пуст. Проверьте папку с package.json:", rootDir);
  }

  return { path: loaded[0] || path.join(rootDir, ".env"), count: total, loaded };
}

function applyEnvFile(envPath) {
  let raw = fs.readFileSync(envPath);
  let text = decodeEnvFile(raw);
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  const parsed = dotenv.parse(text);
  let count = 0;
  for (const [key, value] of Object.entries(parsed)) {
    const k = key.trim();
    let v = value === undefined || value === null ? "" : String(value).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1).trim();
    }
    if (v !== "") {
      process.env[k] = v;
      count += 1;
    }
  }
  return count;
}

function decodeEnvFile(buffer) {
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.toString("utf16le");
  }
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    const swapped = Buffer.alloc(buffer.length);
    for (let i = 0; i < buffer.length - 1; i += 2) {
      swapped[i] = buffer[i + 1];
      swapped[i + 1] = buffer[i];
    }
    return swapped.toString("utf16le");
  }
  return buffer.toString("utf8");
}
