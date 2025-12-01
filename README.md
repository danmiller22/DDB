# UTCN Fleet Dashboard

Next.js + Tailwind liquid-glass дашборд под флит (траки/трейлеры, ремонты, расходы).

## Локальный запуск

```bash
npm install
npm run dev
```

Открой `http://localhost:3000`.

## Переменные окружения

Секреты хранятся в `.env.local` (он уже в `.gitignore` и не уйдёт в GitHub):

```env
SAMSARA_API_KEY="..."
SKYBITZ_BASE_URL="https://xml.skybitz.com/"
SKYBITZ_USERNAME="..."
SKYBITZ_PASSWORD="..."
TIMEZONE="Asia/Bishkek"
```

На Vercel нужно в Settings → Environment Variables задать те же ключи.

## Деплой на Vercel

1. Создай репо на GitHub и залей туда этот проект.
2. В Vercel: *New Project* → выбери репо.
3. Framework: **Next.js** (Vercel сам поймёт).
4. Добавь ENV из `.env.local`.
5. Deploy.

Фронт берёт данные из `/api/fleet-summary`. Сейчас там демо-цифры — их можно заменить на реальные, сделав запросы к Samsara и SkyBitz в файле `pages/api/fleet-summary.ts`.
