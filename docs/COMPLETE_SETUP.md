# 🎬 AnimeVerse - ПОВНА ЗБІРКА З БОТОМ І ОЗВУЧКОЮ

## 📦 Що ти отримаєш:

✅ **Backend API** з озвучкою
✅ **React Frontend** готовий до деплою
✅ **Telegram Bot** для пошуку аніме
✅ **Одна збірка** - всё разом

---

## 🚀 ШВИДКИЙ СТАРТ (30 хвилин)

### КРОК 1️⃣: Локальне тестування

```bash
# 1. Встановити залежности
npm install
npm install -g concurrently

# 2. Створити .env файл
cp .env.example .env

# 3. Запустити все
npm run dev

# Результат:
# - Backend: http://localhost:3000 ✅
# - Frontend: http://localhost:5173 ✅
# - Bot: готовий (але без токена)
```

---

### КРОК 2️⃣: Отримати Telegram Bot

1. **Відкрий Telegram та напиши @BotFather**

2. **Введи команду:** `/newbot`

3. **Відповідай на запитання:**
   ```
   ❓ Як назватиме твого бота?
   → AnimeVerse Bot
   
   ❓ Який username? (має закінчуватися на _bot)
   → animeverse_YOUR_NAME_bot
   
   ✅ Отримаєш TOKEN:
   → 123456789:ABCDefghIjklmnopQRStuvwxyZ1234567890
   ```

4. **Скопіюй TOKEN і вставь у .env:**
   ```
   TELEGRAM_BOT_TOKEN=123456789:ABCDefghIjklmnopQRStuvwxyZ1234567890
   ```

5. **Тестуй бота:**
   ```bash
   npm run bot
   
   # Тепер напиши своєму боту в Telegram:
   # /start
   # Бот повинен відповісти! ✅
   ```

---

### КРОК 3️⃣: Тестування локально

```bash
# Терміналу 1 - Backend API
npm run dev

# Терміналю 2 - Telegram Bot
npm run bot

# Терміналю 3 - React Frontend
# (якщо вже не запущений)
cd frontend  # якщо в окремій папці
npm run dev
```

### Тестуй:
```
🌐 Сайт: http://localhost:5173
📡 API: http://localhost:3000/api/anime
🤖 Бот: Напиши в Telegram @animeverse_your_bot_name
```

---

## 🌐 ДЕПЛОЙ НА RAILWAY (Безплатно!)

### КРОК 1️⃣: Підготовка

```bash
# 1. Зібрати фронтенд
npm run build

# 2. Ініціалізувати git (якщо ще немає)
git init
git add .
git commit -m "Initial commit"

# 3. Розповсюдити на GitHub
# - Завантажи файли на GitHub
# - або використай:
gh repo create animeverse --source=. --public
```

### КРОК 2️⃣: Railway

1. **Перейди на https://railway.app**
2. **Натисни "Login with GitHub"**
3. **Натисни "Create a New Project"**
4. **Вибери "Deploy from GitHub"**
5. **Вибери свій репозиторій "animeverse"**

### КРОК 3️⃣: Налаштування Railway

1. **Railway дашборд:**
   - Натисни на свій проект
   - Перейди на вкладку "Variables"

2. **Додай змінні:**
   ```
   TELEGRAM_BOT_TOKEN = 123456789:ABCDefghIjklmnopQRStuvwxyZ1234567890
   NODE_ENV = production
   PORT = 3000
   API_URL = https://your-railway-url.railway.app
   SITE_URL = https://your-vercel-url.vercel.app
   ```

3. **Натисни Deploy** ✅

### КРОК 4️⃣: Копіюй Railway URL

Railway автоматично генерує URL для твого API:
```
https://animeverse-prod-xyz.railway.app
```

Скопіюй цей URL - буде потрібно!

---

## 📱 ДЕПЛОЙ FRONTEND НА VERCEL

### КРОК 1️⃣: Побудуй фронтенд

```bash
npm run build
```

### КРОК 2️⃣: Vercel

```bash
# Встановити Vercel CLI
npm install -g vercel

# Деплой
vercel
```

Вибір під час деплою:
```
? Set up and deploy "~/anime-viewer"? Yes
? Which scope? (Choose your GitHub account)
? Link to existing project? No
? What's your project's name? animeverse
? In which directory is your code? ./
? Want to modify these settings? No
```

### КРОК 3️⃣: Vercel Environment Variables

1. **Перейди на https://vercel.com/dashboard**
2. **Вибери свій проект "animeverse"**
3. **Settings → Environment Variables**
4. **Додай:**
   ```
   VITE_API_URL = https://your-railway-url.railway.app
   VITE_BOT_USERNAME = animeverse_your_name_bot
   VITE_SITE_URL = https://your-site.vercel.app
   ```

---

## 🤖 НАЛАШТУВАННЯ TELEGRAM BOT

### На Railway Bot запуститься автоматично!

Але якщо хочеш налаштувати команди:

1. **Напиши @BotFather:** `/setcommands`
2. **Вибери свого бота**
3. **Вставь:**
   ```
   start - Головне меню
   search - Пошук аніме
   trending - Популярне
   site - Посилання на сайт
   help - Допомога
   feedback - Залишити коментар
   ```
4. **Натисни Save**

---

## ✅ ЧЕКЛІСТ ЗАПУСКУ

### Локально:
```
□ Node.js встановлений
□ .env файл створений з TELEGRAM_BOT_TOKEN
□ npm install виконаний
□ npm run dev працює (Backend + Frontend)
□ npm run bot працює (Bot запущений)
□ Бот відповідає на /start у Telegram
```

### Railway:
```
□ GitHub репозиторій готовий
□ Railway проект створений
□ Environment variables додані
□ Deploy завершений успішно
□ API доступна на https://your-api.railway.app/api/health
```

### Vercel:
```
□ npm run build успішний
□ Vercel project створений
□ Environment variables додані
□ Frontend доступний на https://your-site.vercel.app
□ Фронтенд підключений до Railway API
```

### Telegram Bot:
```
□ BotFather TOKEN отримано
□ Bot запущений на Railway
□ Команди налаштовані
□ Bot відповідає на пошук
□ Посилання на сайт працюють
```

---

## 🔗 ГОТОВІ ЛІНКИ

Після деплою у тебе будуть:

```
🤖 Telegram Bot:
   @animeverse_your_name_bot

🌐 Веб сайт:
   https://your-site.vercel.app

📡 API:
   https://your-api.railway.app

🔗 Поділися цими лінками з друзями!
```

---

## 📊 АРХІТЕКТУРА СИСТЕМИ

```
┌─────────────────────────────────────────────────────────┐
│                    AnimeVerse System                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐    ┌──────────────────┐          │
│  │  React Frontend  │    │  Telegram Bot    │          │
│  │  (Vercel)        │    │  (Railway)       │          │
│  └────────┬─────────┘    └────────┬─────────┘          │
│           │                       │                     │
│           └───────────┬───────────┘                     │
│                       ▼                                  │
│           ┌──────────────────────┐                      │
│           │   Backend API        │                      │
│           │   (Railway)          │                      │
│           │   - Jikan API        │                      │
│           │   - TTS (Озвучка)    │                      │
│           │   - Search           │                      │
│           └──────────┬───────────┘                      │
│                      │                                   │
│                      ▼                                   │
│           ┌──────────────────────┐                      │
│           │   External APIs      │                      │
│           │   - Jikan (Anime)    │                      │
│           │   - Google TTS       │                      │
│           │   - Telegram API     │                      │
│           └──────────────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🆘 РОЗВ'ЯЗАННЯ ПРОБЛЕМ

### ❌ Помилка: "Cannot find module"
```bash
npm install
npm ci
```

### ❌ Telegram Bot не відповідає
```
✅ Перевір TELEGRAM_BOT_TOKEN у .env
✅ Перевір що бот запущений: npm run bot
✅ На Railway перевір логи (Railroad logs)
```

### ❌ Frontend не підключається до API
```
✅ Перевір VITE_API_URL на Vercel
✅ Переконайся что CORS включений на Railway
✅ API URL повинна бути: https://your-api.railway.app
```

### ❌ API не доступна
```
✅ Перевір Railway Application Health
✅ Переконайся PORT = 3000
✅ Дивись Railway Logs для помилок
```

---

## 📚 КОРИСНІ КОМАНДИ

```bash
# Локальна розробка
npm run dev          # Запустити все
npm run bot          # Тільки бот
npm run build        # Зібрати фронтенд

# Git
git add .
git commit -m "Message"
git push origin main

# Railway CLI (опціонально)
npm install -g @railway/cli
railway login
railway deploy
```

---

## 🎉 ГОТОВО!

У тебе тепер є повнофункціональна система:

✅ **Веб сайт** для пошуку аніме (Vercel)
✅ **API сервер** з озвучкою (Railway)
✅ **Telegram Bot** для взаємодії (Railway)
✅ **Озвучка** через Google TTS
✅ **Всьо розгорнуто на безплатних хостах**

---

## 📲 ПОДІЛИСЬ

```
🎬 AnimeVerse - Пошук аніме з озвучкою!

🤖 Telegram Bot: https://t.me/animeverse_your_name_bot
🌐 Веб сайт: https://your-site.vercel.app

Спробуй прямо зараз! 🚀
```

---

**Успіхів у розробці!** ✨🎬🚀
