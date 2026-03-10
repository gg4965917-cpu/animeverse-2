# 🚀 AnimeVerse - Деплой на Railway (Безплатно!)

## 📋 Що буде розгорнуто:

✅ **Backend API** на Node.js (http://your-api.railway.app)
✅ **React Frontend** на Vercel (http://your-site.vercel.app)
✅ **Telegram Bot** (підключений до API)
✅ **Озвучка** (Google TTS)
✅ **Збірка** з усім у одному місці

---

## 🎯 Крок 1: Підготовка проекту

### На ПК:

```bash
# 1. Створи папку для проекту
mkdir anime-full-stack
cd anime-full-stack

# 2. Зберіж ці файли:
# - api-server.js (бекенд)
# - telegram-bot.js (бот)
# - backend-package.json (залежности)
# - src/components/AnimeViewer.jsx (фронтенд)
# - vite.config.js
# - package.json (фронтенд)
# - .env (конфіг)

# 3. Встанови залежности
npm install
```

---

## 🌐 Крок 2: Деплой Backend на Railway

### 2.1 Реєстрація на Railway

1. Перейди на https://railway.app
2. Натисни "Login with GitHub"
3. Підключи свій GitHub аккаунт
4. Дозволи доступ до репозиторіїв

### 2.2 Створення проекту

1. **Натисни "New Project"**
2. **Выбери "Deploy from GitHub"**
3. **Вибери свій репозиторій** (з AnimeVerse)

### 2.3 Конфігурація

```yaml
# railway.json (у корені проекту)
{
  "build": {
    "builder": "dockerfile"
  },
  "deploy": {
    "numReplicas": 1,
    "startCommand": "npm run start"
  }
}
```

### 2.4 Переменні окружения

На Railway дашборді додай змінні:

```
TELEGRAM_BOT_TOKEN = YOUR_BOT_TOKEN
API_URL = https://your-api.railway.app
SITE_URL = https://your-site.vercel.app
PORT = 3000
NODE_ENV = production
```

---

## 🤖 Крок 3: Создание Telegram Bot

### 3.1 Создание бота

1. Відкрий Telegram та знайди **@BotFather**
2. Напиши: `/newbot`
3. Дай ім'я: **AnimeVerse Bot**
4. Дай username: **animeverse_bot** (або інший)
5. 📋 Скопіюй TOKEN та вставь у Railway переменну `TELEGRAM_BOT_TOKEN`

### 3.2 Налаштування бота

1. Напиши @BotFather: `/setcommands`
2. Вибери свого бота
3. Вставь:
```
start - Головне меню
search - Пошук аніме
trending - Популярне
site - Лінк на сайт
help - Допомога
```

---

## 📱 Крок 4: Деплой Frontend на Vercel

### 4.1 Підготовка

```bash
# 1. Зібрати фронтенд
npm run build

# 2. Переименування пакета
mv package.json package-frontend.json
mv backend-package.json package.json

# 3. Додай у .gitignore:
dist/
.env.local
node_modules/
```

### 4.2 Деплой на Vercel

```bash
# 1. Встановити Vercel CLI
npm install -g vercel

# 2. Деплой
vercel
```

**При запиті вибір:**
- Project name: `animeverse`
- Framework: `Vite`
- Root directory: `./` (default)

### 4.3 Налаштування Vercel

1. Перейди на https://vercel.com/dashboard
2. Знайди свій проект
3. Settings → Environment Variables
4. Додай:
```
VITE_API_URL = https://your-api.railway.app
VITE_BOT_USERNAME = animeverse_bot
VITE_SITE_URL = https://your-site.vercel.app
```

---

## 📁 Структура проекту для деплою

```
anime-full-stack/
├── api-server.js              # Backend сервер
├── telegram-bot.js            # Telegram бот
├── package.json               # Backend залежности
├── .env                        # Конфіг (НЕ комітуй!)
├── .env.example               # Приклад конфіга
├── Dockerfile                 # Docker для Railway
├── railway.json              # Railway конфіг
├── src/
│   ├── components/
│   │   └── AnimeViewer.jsx    # React компонент
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── index.html
└── dist/                      # Зібраний фронтенд
```

---

## 🐳 Dockerfile для Railway

Створи файл `Dockerfile` в корені:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Копіюй package.json
COPY package.json package-lock.json ./

# Встановлення залежностей
RUN npm ci --only=production

# Копіюй весь код
COPY . .

# Собери фронтенд
COPY src/ src/
COPY vite.config.js index.html ./
RUN npm run build

# Expose порт
EXPOSE 3000

# Запуск
CMD ["npm", "start"]
```

---

## 🔧 .env файл (локально)

Створи `.env`:

```
# Backend
PORT=3000
NODE_ENV=development

# Telegram Bot
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE

# URLs
API_URL=http://localhost:3000
SITE_URL=http://localhost:5173
```

**Не комітуй .env!** Додай у `.gitignore`

---

## 📊 Повна збірка на одному серверу

Якщо хочеш все на одному Railway серверові:

### package.json:
```json
{
  "scripts": {
    "start": "npm run build:frontend && node api-server.js",
    "build:frontend": "vite build",
    "dev": "concurrently \"npm run dev:api\" \"npm run dev:bot\"",
    "dev:api": "nodemon api-server.js",
    "dev:bot": "nodemon telegram-bot.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.4.0",
    "node-telegram-bot-api": "^0.64.0",
    "concurrently": "^8.0.0"
  }
}
```

---

## ✅ Чекліст деплою

### Railway Backend:
```
□ GitHub репозиторій з api-server.js
□ package.json з залежностями
□ Dockerfile готовий
□ .env переменні додані на Railway
□ Webhook для Telegram налаштований
```

### Vercel Frontend:
```
□ npm run build успішно виконаний
□ dist/ папка створена
□ GitHub синхронізований
□ Environment variables додані на Vercel
□ Домен настроєний (або railway.app)
```

### Telegram Bot:
```
□ BotFather TOKEN отримано
□ Bot запущений у Railway
□ Команди налаштовані (@BotFather)
□ Вебхук налаштований (opcional)
□ Можна искать через @animeverse_bot
```

---

## 🚀 Запуск системи

### Локально (розробка):
```bash
# Терміналу 1 - Backend
npm run dev

# Терміналю 2 - Bot
npm run bot

# Терміналю 3 - Frontend
npm run dev
```

### На Railway:
```bash
# Просто натисни Deploy!
# Система запуститься автоматично
```

---

## 📱 Робота с Telegram Bot

### Для користувачів:

1. **Знайди бота:** @animeverse_bot
2. **Команди:**
   - `/start` - Меню
   - `/search Death Note` - Пошук
   - `/trending` - Популярне
   - `/site` - Лінк на сайт

### Для тебе (розробника):

1. Запусти: `node telegram-bot.js`
2. Тестуй у Telegram
3. При виході на production все налаштується автоматично

---

## 🔗 Готові лінки

После деплою отримаєш:

```
📱 Telegram Bot: @animeverse_bot
🌐 Website: https://your-site.vercel.app
📡 API: https://your-api.railway.app
```

Поділись цими лінками з друзями! 🎉

---

## 🆘 Розв'язання проблем

### Помилка: "Bot token not found"
```
→ Додай TELEGRAM_BOT_TOKEN у Railway variables
```

### Помилка: "CORS error"
```
→ Переконайся що corsсконфігурований у api-server.js
```

### Помилка: "API not responding"
```
→ Перевір Railway logs
→ Переконайся що PORT = 3000
```

---

## 📚 Корисні посилання

- [Railway](https://railway.app)
- [Vercel](https://vercel.com)
- [Telegram Bot API](https://core.telegram.org/bots)
- [Jikan API](https://docs.api.jikan.moe)

---

## 🎉 Готово!

Тепер у тебе є:
✅ Полнофункціональний сайт AnimeVerse
✅ Telegram Bot для пошуку
✅ Озвучка (Google TTS)
✅ Деплоєний на безплатних хостах!

**Посилання для поділу:**
```
🤖 Telegram: https://t.me/animeverse_bot
🌐 Website: https://your-site.vercel.app
```

**Успіхів!** 🚀✨
