#!/bin/bash

# 🎬 ANIMEVERSE - AUTO INSTALLATION SCRIPT
# Цей скрипт автоматично встановлює все необхідне

echo "🎬 AnimeVerse - Автоматична установка"
echo "======================================"
echo ""

# Перевірити Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не встановлений!"
    echo "📥 Завантажи з https://nodejs.org"
    exit 1
fi

echo "✅ Node.js: $(node --version)"
echo "✅ npm: $(npm --version)"
echo ""

# Встановлення залежностей
echo "📥 Встановлення залежностей..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "✅ Залежности встановлені!"
else
    echo "❌ Помилка при встановленні залежностей"
    exit 1
fi

echo ""

# Створити .env файл
if [ ! -f .env ]; then
    echo "⚙️  Створення .env файла..."
    cp .env.example .env
    echo "✅ .env файл створений!"
    echo ""
    echo "⚠️  ВАЖНО! Добавь TELEGRAM_BOT_TOKEN в .env:"
    echo "   1. Напиши @BotFather в Telegram"
    echo "   2. Команда: /newbot"
    echo "   3. Скопіюй TOKEN"
    echo "   4. Відкрий .env і вставь TOKEN"
else
    echo "✅ .env файл вже існує"
fi

echo ""
echo "======================================"
echo "✅ УСТАНОВКА ЗАВЕРШЕНА!"
echo "======================================"
echo ""
echo "🚀 НАСТУПНІ КРОКИ:"
echo ""
echo "1️⃣  Налаштуй .env файл (добавь TELEGRAM_BOT_TOKEN)"
echo ""
echo "2️⃣  Запусти сервер:"
echo "    npm start"
echo ""
echo "3️⃣  (У новому терміналу) Запусти бота:"
echo "    npm run bot"
echo ""
echo "4️⃣  (У новому терміналу) Запусти фронтенд:"
echo "    npm run dev"
echo ""
echo "5️⃣  Тестуй:"
echo "    🌐 http://localhost:5173"
echo "    📡 http://localhost:3000/api/health"
echo "    🤖 @animeverse_your_name_bot в Telegram"
echo ""
echo "📚 Для деплою читай docs/DEPLOY_GUIDE.md"
echo ""
echo "Успіхів! 🚀✨"
