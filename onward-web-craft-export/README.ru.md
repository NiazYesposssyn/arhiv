# ГА ВКО — сайт архива (удобная версия для Cursor)

Тот же сайт, что был в Lovable. **Внешний вид и страницы не менялись** — тексты вынесены в понятную папку `src/content/`.

## Быстрый старт

1. Откройте в Cursor **папку с `package.json`** (не внешнюю вложенную после ZIP).
2. В терминале:

```bash
npm install
npm run dev
```

3. Откройте адрес из терминала (часто http://localhost:8080).

## Где править тексты

| Что менять | Файл |
|------------|------|
| Главная | `src/content/home.ts` |
| Фонды | `src/content/fonds.ts` |
| Контакты | `src/content/contacts.ts` |
| Услуги | `src/content/uslugi.ts` |
| Меню и подвал (RU) | `src/content/texts.ru.ts` |

Подробная карта: **КАРТА_САЙТА.md**

## Язык проекта

- **TypeScript** + **React** (файлы `.tsx`)
- Стили: **Tailwind CSS** (классы в разметке)

## Синхронизация с GitHub

Репозиторий: https://github.com/NiazYesposssyn/onward-web-craft

Ветка с понятной структурой: `cursor/student-friendly-structure-c401`

```bash
git pull origin cursor/student-friendly-structure-c401
```

## Диплом

Укажите в работе, что использовали Lovable/Cursor и **какие файлы вы меняли** в `src/content/`.
