#!/usr/bin/env node
/**
 * Подставляет SUPABASE_URL и publishable-ключ из .env в фронтенд (assets/index-*.js).
 * Нужно, если у вас свой проект Supabase, а не rycgzckzrxedsbpwvzbh.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "../api/load-env.mjs";
import { anonKey, supabaseUrl } from "../api/env-keys.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnv(ROOT);

const url = supabaseUrl();
const anon = anonKey();

if (!url.includes(".supabase.co")) {
  console.error("В .env задайте SUPABASE_URL=https://ВАШ_ID.supabase.co");
  process.exit(1);
}

const OLD_URL = "https://rycgzckzrxedsbpwvzbh.supabase.co";
const OLD_ANON = "sb_publishable_s5tZ2F3yvTih_nvLcEP2Qw_nhXCFxBI";

const assetsDir = path.join(ROOT, "assets");
const files = fs.readdirSync(assetsDir).filter((f) => f.startsWith("index-") && f.endsWith(".js"));

let changed = 0;
for (const name of files) {
  const filePath = path.join(assetsDir, name);
  let text = fs.readFileSync(filePath, "utf8");
  if (!text.includes(OLD_URL) && !text.includes(OLD_ANON)) continue;
  text = text.split(OLD_URL).join(url);
  text = text.split(OLD_ANON).join(anon);
  fs.writeFileSync(filePath, text);
  changed += 1;
  console.log("Обновлён:", name);
}

if (changed === 0) {
  console.log("Файлы index-*.js уже содержат ваш URL или шаблон не найден.");
} else {
  console.log("\nГотово. URL:", url);
  console.log("Перезапустите: npm start");
}
