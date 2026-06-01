# ЦГА ВКО — continue-our-site

Зеркало сайта [continue-our-site.lovable.app](https://continue-our-site.lovable.app): **Центральный государственный архив Восточно-Казахстанской области** (Өскемен).

Собранный production-бандл Lovable (React + Vite), сохранён локально — можно править в Cursor и выкладывать на свой хостинг.

## Страницы

| URL | Раздел |
|-----|--------|
| `/` | Главная |
| `/services` | Услуги |
| `/collections` | Фонды |
| `/digital` | Электронный архив |
| `/map` | Карта архивов (Leaflet) |
| `/about` | О нас |
| `/contact` | Контакты и заявка |
| `/auth` | Вход |
| `/admin` | Панель |

## Запуск локально

**Важно:** нужен сервер с поддержкой SPA (маршруты вроде `/services` иначе дадут 404).

```bash
python3 serve.py
```

Откройте: [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

Обычный `python3 -m http.server` подойдёт только для главной (`/`).

## Деплой

- **Vercel / Netlify:** в корне есть `vercel.json` и `public/_redirects` — все пути ведут на `index.html`.
- Статика: `index.html` + папка `assets/`.

## Ограничения зеркала

- Исходников React (`.tsx`) нет — только минифицированный JS из Lovable.
- Бэкенд (Supabase, формы, авторизация) может не работать без ваших ключей в Lovable.
- Для глубоких правил дизайна удобнее позже пересобрать проект в Vite/React по этому же макету.

## Обновление с Lovable

Если на Lovable снова опубликовали новую версию, можно перекачать бандл:

```bash
curl -sL "https://continue-our-site.lovable.app/" -o index.html
# и файлы из /assets/ по списку в index.html
```
