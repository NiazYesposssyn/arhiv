# Archive Access System

Многостраничный корпоративный портал электронного архива в стиле modern SaaS / eGov.

## Как открыть сайт в Cursor

1. Откройте терминал в корне проекта.
2. Запустите:

```bash
npm start
```

3. Откройте адрес:

```text
http://localhost:4173
```

В Cursor Cloud порт `4173` можно открыть через preview / forwarded ports.

## Главная страница

Основной файл:

```text
index.html
```

## Почему много HTML-файлов

Это нормально: сайт сделан как многостраничный портал. Отдельные HTML-файлы нужны для публичных страниц, авторизации, личного кабинета и админ-панели:

- `index.html` — главная;
- `login.html`, `register.html` — авторизация;
- `dashboard.html`, `documents.html`, `requests.html` — личный кабинет;
- `admin.html`, `users.html`, `roles.html`, `audit-logs.html` — админ-панель.

Весь общий дизайн и логика находятся в двух файлах:

- `styles.css`
- `app.js`