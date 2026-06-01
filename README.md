# ЦГА ВКО — официальный портал архива

## Запуск (ничего настраивать не нужно)

**Windows:** дважды щёлкните **`ЗАПУСК.bat`** или **`START.bat`**.

Откроется **http://127.0.0.1:8080/**

- Заявки с сайта сохраняются в **`data/requests.json`**
- **Supabase не нужен**, файл `.env` не обязателен
- Просмотр заявок: **http://127.0.0.1:8080/panel.html** (код: `ARHIV-VKO-2026`)

Подробно: **`КАК_ЗАПУСТИТЬ.txt`**

---

## Node.js вручную

```bash
npm install
npm start
```

---

## Supabase (необязательно)

По умолчанию заявки — **локально**. Чтобы писать в Supabase, в `.env`:

```env
SUPABASE_REQUESTS=1
SUPABASE_URL=...
SUPABASE_SECRET_KEY=sb_secret_...
```

См. `supabase/setup-your-project.sql` для своего проекта.

---

## Структура

```
index.html, assets/   — сайт
server.mjs, api/      — сервер
panel.html            — панель заявок
data/requests.json    — заявки (создаётся сам)
```
