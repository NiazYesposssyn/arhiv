# ЦГА ВКО — официальный портал архива

Сайт **Центрального государственного архива Восточно-Казахстанской области** (Өскемен).

Проект живёт **в Cursor / на вашем компьютере**. **Lovable в работе сайта не участвует** — нет прокси, нет плашки «Edit with Lovable».

## Быстрый старт

### 1. Node.js

Установите LTS: https://nodejs.org/

### 2. Ключ Supabase (один раз)

Скопируйте `.env.example` → `.env` и вставьте **service_role** из Supabase:

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard) проекта архива (тот же, что был у сайта на Lovable).
2. **Settings → API → service_role** (секретный ключ).
3. Вставьте в `.env`:

```env
SUPABASE_SERVICE_ROLE_KEY=ваш_ключ
STAFF_ACCESS_CODE=ARHIV-VKO-2026
```

Без секретного ключа не работают **админка** и **/staff**. **Заявки** можно принимать и без него — см. «Обход» ниже.

### 3. Запуск

```bash
npm install
npm start
```

Откройте: **http://127.0.0.1:8080/**

**Windows:** можно `START.bat` / `ЗАПУСК.bat` (папка с `package.json`).

### Заявки: «Задайте SUPABASE_SERVICE_ROLE_KEY» (обход)

**Способ 1 — секретный ключ в `.env`** (в папке с `package.json`):

```env
SUPABASE_SECRET_KEY=sb_secret_ваш_ключ_из_Dashboard
```

или `SUPABASE_SERVICE_ROLE_KEY=eyJ...` (вкладка «Устаревшие ключи»).

Перезапуск: `npm start`. Проверка: http://127.0.0.1:8080/api/health → `"serviceRole": true`.

**Способ 2 — без секрета (только заявки):**

1. В [Supabase](https://supabase.com/dashboard) → проект **rycgzckzrxedsbpwvzbh** → **SQL Editor**
2. Вставьте и выполните файл `supabase/allow-public-requests.sql` из этого репозитория
3. `npm start` — заявки пойдут через publishable-ключ (как на сайте в браузере)

`.env` может лежать **на уровень выше** вложенной папки — сервер подхватит автоматически.

### Ошибка `EADDRINUSE` (порт 8080 занят)

Сервер **уже запущен** в другой вкладке терминала — откройте **http://127.0.0.1:8080/** и не запускайте `npm start` повторно.

Или освободите порт в PowerShell:

```powershell
netstat -ano | findstr :8080
taskkill /PID <номер_из_последней_колонки> /F
```

Либо в `.env` укажите `PORT=8081`, сохраните и снова `npm start`.

---

## Что работает локально

| Функция | URL |
|---------|-----|
| Все страницы, дизайн | `/` … `/contact` |
| Вход / регистрация | `/auth` (Supabase) |
| Заявка | `/contact`, формы услуг |
| Служебный вход | `/staff` (код из `.env`) |
| Панель | `/admin` |

---

## Важно

- Открывайте только **`http://127.0.0.1:8080`**, не `file:///…/index.html`.
- **Lovable не нужен** после настройки `.env`.
- База данных — **ваш Supabase** (можно позже перенести в свой новый проект Supabase).
- Служебный код по умолчанию: `ARHIV-VKO-2026` — смените в `.env`.

## Структура

```
index.html, assets/     — фронтенд (как на опубликованном сайте)
server.mjs              — сервер без Lovable
api/                    — заявки и админ-логика
scripts/clean-branding.py
```

## Обновление дизайна с опубликованного URL (необязательно)

```bash
npm run sync
```

Скачивает файлы с URL и убирает брендинг Lovable. Для работы сайта sync **не обязателен**.
