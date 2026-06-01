import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

/**
 * Надёжная загрузка .env на Windows (UTF-8 / UTF-16 / BOM).
 */
export function loadEnv(rootDir) {
  const envPath = path.join(rootDir, ".env");
  if (!fs.existsSync(envPath)) {
    console.warn("⚠  Файл .env не найден:", envPath);
    return { path: envPath, count: 0 };
  }

  let raw = fs.readFileSync(envPath);
  let text = decodeEnvFile(raw);

  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  const parsed = dotenv.parse(text);
  let count = 0;
  for (const [key, value] of Object.entries(parsed)) {
    if (value !== undefined && value !== "") {
      process.env[key] = value;
      count += 1;
    }
  }

  return { path: envPath, count };
}

function decodeEnvFile(buffer) {
  // UTF-16 LE (Блокнот Windows)
  if (buffer.length >= 2 && buffer[0] === 0xff && buffer[1] === 0xfe) {
    return buffer.toString("utf16le");
  }
  // UTF-16 BE
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
