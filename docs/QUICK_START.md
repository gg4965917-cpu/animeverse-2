# ⚡ ЗАПУСТИ АНІМЕВЕРС ЗА 5 ХВИЛИН!

## 📋 ТВА ЗБІРКА СКЛАДАЄТЬСЯ З:

✅ React Frontend (з Vite)
✅ Node.js Backend API (з озвучкою)
✅ Telegram Bot (для пошуку)
✅ Готова для деплою на Railway + Vercel

---

## 🚀 КРОК 1: ЛОКАЛЬНЕ ТЕСТУВАННЯ

```bash
# 1. Встановити залежности
npm install

# 2. Створити .env файл
cp .env.example .env

# 3. Запустити (у 3 терміналах):

# ТЕРМІНАЛУ 1 - Backend API
npm start

# ТЕРМІНАЛЮ 2 - Telegram Bot (опціонально)
npm run bot

# ТЕРМІНАЛЮ 3 - React Frontend
npm run dev
```

**Результат:**
```
🌐 Frontend: http://localhost:5173
📡 API: http://localhost:3000
🤖 Bot: Ready (потребує TELEGRAM_BOT_TOKEN)
```

---

## 🤖 КРОК 2: ОТРИМАТИ TELEGRAM BOT TOKEN

1. **Відкрий Telegram та напиши:** `@BotFather`
2. **Введи:** `/newbot`
3. **Назва бота:** `AnimeVerse Bot`
4. **Username:** `animeverse_your_name_bot`
5. **Скопіюй TOKEN** який дав BotFather
6. **Вставь у .env:**
   ```
   TELEGRAM_BOT_TOKEN=YOUR_TOKEN_HERE
   ```
7. **Тепер запусти:** `npm run bot`
8. **Тестуй бота** - напиши `/start` у Telegram

---

## 🌐 КРОК 3: ДЕПЛОЙ НА RAILWAY (Безплатно!)

### 3.1 Підготовка

```bash
# Зібрати фронтенд
npm run build

# Ініціалізувати git
git init
git add .
git commit -m "Initial commit"
```

### 3.2 Деплой

1. **Перейди** на https://railway.app
2. **Натисни** "Login with GitHub"
3. **Натисни** "New Project" → "Deploy from GitHub"
4. **Вибери** свій репозиторій

### 3.3 Налаштування

На Railway дашборді додай змінні:
```
TELEGRAM_BOT_TOKEN = YOUR_TOKEN
NODE_ENV = production
PORT = 3000
```

**Натисни Deploy** ✅

Railway дасть тобі URL:
```
https://animeverse-prod-xyz.railway.app
```

---

## 📱 КРОК 4: ДЕПЛОЙ FRONTEND НА VERCEL

```bash
# Встановити Vercel CLI
npm install -g vercel

# Деплой
vercel
```

На Vercel додай:
```
VITE_API_URL = https://your-railway-url.railway.app
```

---

## ✅ ГОТОВО! 🎉

**У тебе є:**
```
🤖 Telegram Bot: @animeverse_your_name_bot
🌐 Веб сайт: https://your-site.vercel.app
📡 API: https://your-api.railway.app
```

---

## 📂 ВАЖЛИВІ ФАЙЛИ

| Файл | Опис |
|------|------|
| `api-server.js` | Backend API (запускай: `npm start`) |
| `telegram-bot.js` | Telegram Bot (запускай: `npm run bot`) |
| `src/components/AnimeViewer.jsx` | React компонент |
| `.env.example` | Приклад конфіга (скопіюй як .env) |
| `COMPLETE_SETUP.md` | **ЧИТАЙ ЦІЛЬКИ!** Повна інструкція |
| `DEPLOY_GUIDE.md` | Детальний гайд для деплою |

---

## 🎯 КОМАНДИ

```bash
# Розробка
npm run dev         # Запустити фронтенд
npm start           # Запустити API сервер
npm run bot         # Запустити Telegram Bot

# Build
npm run build       # Зібрати фронтенд для production

# Залежности
npm install         # Встановити залежности
npm ci              # Встановити точні версії

# Railway
vercel              # Деплой на Vercel (фронтенд)
```

---

## 🆘 ЯКЩО ЩО-НЕБУДЬ НЕ ПРАЦЮЄ

1. **Bot не відповідає:**
   - Перевір TELEGRAM_BOT_TOKEN у .env
   - Запусти: `npm run bot`

2. **Frontend не завантажується:**
   - Перевір що Backend запущений: `npm start`
   - Очистити браузер кеш (Ctrl+Shift+Delete)

3. **API помилка:**
   - Перевір PORT = 3000 у .env
   - Дивись лог: `npm start`

---

## 📚 ДОКЛАДНІШЕ

Для більш докладних інструкцій читай:
- **COMPLETE_SETUP.md** - Все про запуск та деплой
- **DEPLOY_GUIDE.md** - Детальний гайд для Railway/Vercel

---

## 🎬 ГОТОВО! ЗАПУСКАЙ!

```bash
npm install
npm start
npm run bot
npm run dev
```

**Успіхів!** 🚀✨

**Питання?** Читай документацію або поправляй код! 💪
