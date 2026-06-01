# ЦГА ВКО — continue-our-site

Полная копия сайта [continue-our-site.lovable.app](https://continue-our-site.lovable.app): **Центральный государственный архив Восточно-Казахстанской области**.

## Запуск (всё как на Lovable)

### Windows (если ошибка `ENOENT package.json`)

Часто после скачивания ZIP папка **вложенная**:

```
Downloads\arhiv-cursor-continue-our-site-10a4\     ← здесь npm start НЕ работает
    arhiv-cursor-continue-our-site-10a4\           ← здесь лежит package.json
        package.json
        index.html
        ...
```

**Вариант 1 — двойной щелчок:** файл **`START.bat`** или **`ЗАПУСК.bat`** (в папке с `package.json`, или во внешней — скрипт сам найдёт вложенную).

**Вариант 2 — терминал:**

```powershell
cd C:\Users\Нияз\Downloads\arhiv-cursor-continue-our-site-10a4\arhiv-cursor-continue-our-site-10a4
npm start
```

(путь подставьте свой — в проводнике откройте папку, где видите `package.json`, скопируйте путь из адресной строки)

Нужен **Node.js**: https://nodejs.org/ (LTS), затем в новом терминале снова `npm start`.

### Mac / Linux

```bash
cd путь/к/папке/с/package.json
npm start
```

Откройте: **http://127.0.0.1:8080/**

Сервер `server.mjs` делает две вещи:

1. Отдаёт сайт (React SPA) и все страницы (`/services`, `/map`, `/admin` …).
2. **Проксирует** запросы `/_serverFn/*` на Lovable — без этого **не работают** панель администратора и служебный вход (`/staff`).

> Если Lovable снова отключат (404), админка и служебные функции перестанут работать, пока не поднимете свой бэкенд. Визуальная часть сайта останется.

## Что должно работать

| Функция | Как проверить |
|---------|----------------|
| Все страницы | Главная, Услуги, Фонды, Электронный архив, Карта, О нас, Контакты |
| Регистрация / вход | `/auth` — тот же Supabase, что у Lovable |
| Заявка на контактах | `/contact` — после входа (см. ниже) |
| Заказ услуги | `/services` → «Подробнее» → форма |
| Карта | `/map` (Leaflet) |
| Панель | `/admin` (нужен служебный код + учётка сотрудника) |
| Служебный вход | `/staff` |

### Вход и заявки

База данных — **Supabase проекта Lovable** (`rycgzckzrxedsbpwvzbh.supabase.co`). Ключ уже внутри бандла.

1. Зарегистрируйтесь на `/auth` (надёжный пароль, не из списка «утёкших»).
2. Подтвердите e-mail по ссылке из письма (если Supabase требует подтверждение).
3. После входа отправляйте заявки на `/contact` и в формах услуг.

### Админка и `/staff`

Нужны **служебный код** и учётная запись сотрудника, как на оригинальном сайте. Код выдаёт администратор архива в Lovable (переменная окружения на их сервере). Без правильного кода панель не откроется — это так же на Lovable.

## Деплой (Vercel / Netlify)

В `vercel.json` и `_redirects` настроено:

- прокси `/_serverFn` → Lovable;
- SPA для остальных путей.

Для **своего домена** добавьте в Supabase (Lovable → Backend):  
**Authentication → URL Configuration** → Redirect URLs:  
`https://ваш-домен.kz/**` и `http://localhost:8080/**`

## Обновление с Lovable

```bash
npm run sync
```

Скачает свежий `index.html` и `assets/`.

## Структура

```
index.html          — SPA
assets/             — JS, CSS, изображения
server.mjs          — локальный сервер + прокси
vercel.json         — деплой
scripts/sync-from-lovable.sh
```

## Ограничения

- Нет исходников `.tsx` — только production-бандл.
- Админка зависит от прокси на Lovable (серверные функции TanStack Start).
- Полная автономия без Lovable потребует свой Supabase + перенос server functions (отдельная задача).
