# Archive Access System (электрондық мұрағат)

Статическая копия портала **continue-our-site** (Lovable): публичные страницы, авторизация, личный кабинет и админ-панель.

> Опубликованный URL `https://continue-our-site.lovable.app` сейчас отдаёт **404** (проект снят с хостинга или лимит Lovable). Сайт полностью лежит в этом репозитории — правки делайте здесь, в Cursor.

## Структура

| Папка / файл | Назначение |
|--------------|------------|
| `index.html`, `about-system.html`, `archive.html`, … | Публичный сайт (қазақ тілі) |
| `auth/` | Кіру, тіркелу, 2FA, қалпына келтіру |
| `app/` | Пайдаланушы кабинеті |
| `admin/` | Әкімші панелі |
| `assets/css/styles.css` | Стильдер, жарық/қараңғы тақырып |
| `assets/js/main.js` | Мәзір, анимация, FAQ, карталар |

## Локальный запуск

```bash
cd /workspace
python3 -m http.server 8080
```

Откройте в браузере: [http://localhost:8080/index.html](http://localhost:8080/index.html)

## Основные страницы

- Главная: `/index.html`
- Архив: `/archive.html`
- Қызметтер: `/services.html`
- Кіру: `/auth/login.html`
- Кабинет: `/app/dashboard.html`
- Админ: `/admin/index.html`

## Дальнейшая разработка

Сейчас это **статический HTML/CSS/JS** без бэкенда. Формы и кнопки — демо-интерфейс. Для продакшена можно подключить API, Supabase, или перенести в React/Next по тем же макетам.
