const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('dotenv').config();

// Замінь на свій Telegram Bot Token
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const API_URL = process.env.API_URL || 'http://localhost:3000';
const SITE_URL = process.env.SITE_URL || 'http://localhost:5173';

const bot = new TelegramBot(TOKEN, { polling: true });

// Store user states для пошуку
const userStates = {};

console.log('🤖 Telegram Bot запущений!');
console.log(`API URL: ${API_URL}`);
console.log(`Site URL: ${SITE_URL}`);

// ✅ Команда /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      keyboard: [
        ['🔍 Пошук аніме'],
        ['⭐ Популярне'],
        ['📱 Відкрити сайт'],
        ['❓ Допомога']
      ],
      resize_keyboard: true
    }
  };

  bot.sendMessage(
    chatId,
    `👋 Привіт, ${msg.from.first_name}! 🎬\n\n` +
    `Ласкаво просимо на AnimeVerse!\n\n` +
    `Я допоможу тобі знайти улюблене аніме.\n\n` +
    `Виберіть дію або введіть назву аніме:`,
    keyboard
  );
});

// ✅ Команда /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const help = `
🎬 *AnimeVerse Bot Commands*

/start - Головне меню
/search <назва> - Пошук аніме
/trending - Популярне аніме
/help - Допомога
/site - Лінк на сайт

Приклади:
/search Death Note
/search Attack on Titan
/trending

Або просто введи назву аніме в чат! 🔍
  `;

  bot.sendMessage(chatId, help, { parse_mode: 'Markdown' });
});

// ✅ Кнопка "🔍 Пошук аніме"
bot.onText(/🔍 Пошук аніме/, (msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = 'searching';
  bot.sendMessage(chatId, 'Введи назву аніме яке хочеш знайти:');
});

// ✅ Кнопка "⭐ Популярне"
bot.onText(/⭐ Популярне/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendChatAction(chatId, 'typing');

  try {
    const response = await axios.get(`${API_URL}/api/trending`);
    const animes = response.data;

    let message = '⭐ *Популярне аніме:*\n\n';
    animes.slice(0, 5).forEach((anime, index) => {
      message += `${index + 1}. *${anime.title}*\n`;
      message += `   ⭐ ${anime.rating}\n`;
      message += `   📺 ${anime.episodes} епізодів\n\n`;
    });

    message += `[Відкрити сайт](${SITE_URL})`;

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: false
    });
  } catch (error) {
    bot.sendMessage(chatId, '❌ Помилка при завантаженні популярного');
  }
});

// ✅ Кнопка "📱 Відкрити сайт"
bot.onText(/📱 Відкрити сайт/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🌐 Відкрити AnimeVerse',
            url: SITE_URL
          }
        ]
      ]
    }
  };

  bot.sendMessage(
    chatId,
    '🌐 Натисни кнопку щоб відкрити повний сайт AnimeVerse:',
    keyboard
  );
});

// ✅ Кнопка "❓ Допомога"
bot.onText(/❓ Допомога/, (msg) => {
  const chatId = msg.chat.id;
  const help = `
🎬 *AnimeVerse Bot - Допомога*

*Що я умію робити?*

🔍 Пошук аніме - введи назву
⭐ Показувати популярне
🌐 Лінк на сайт з повним каталогом
🔊 Озвучка інформації про аніме (скоро)

*Приклади пошуку:*
- Death Note
- Attack on Titan
- Demon Slayer

*Форма зворотного зв'язку:*
Надішли мені /feedback і опиши проблему

Стань частиною AnimeVerse! 🎉
  `;

  bot.sendMessage(chatId, help, { parse_mode: 'Markdown' });
});

// ✅ Команда /search
bot.onText(/\/search (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const searchQuery = match[1];

  await searchAnime(chatId, searchQuery);
});

// ✅ Команда /trending
bot.onText(/\/trending/, async (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    reply_markup: {
      keyboard: [
        ['🔍 Пошук аніме'],
        ['⭐ Популярне'],
        ['📱 Відкрити сайт'],
        ['❓ Допомога']
      ],
      resize_keyboard: true
    }
  };

  try {
    const response = await axios.get(`${API_URL}/api/trending`);
    const animes = response.data;

    let message = '⭐ *Популярне аніме*\n\n';
    animes.forEach((anime, index) => {
      message += `${index + 1}. *${anime.title}*\n`;
      message += `   ⭐ ${anime.rating} | 📺 ${anime.episodes} серій\n\n`;
    });

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: keyboard.reply_markup
    });
  } catch (error) {
    bot.sendMessage(chatId, '❌ Помилка при завантаженні');
  }
});

// ✅ Команда /site
bot.onText(/\/site/, (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🌐 Перейти на AnimeVerse',
            url: SITE_URL
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, '🌐 Натисни кнопку:', keyboard);
});

// ✅ Обробка звичайних текстових повідомлень
bot.on('message', async (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    const chatId = msg.chat.id;

    // Якщо користувач у режимі пошуку
    if (userStates[chatId] === 'searching') {
      await searchAnime(chatId, msg.text);
      userStates[chatId] = null;
    }
  }
});

// ✅ Функція для пошуку аніме
async function searchAnime(chatId, query) {
  try {
    bot.sendChatAction(chatId, 'typing');

    const response = await axios.get(`${API_URL}/api/search`, {
      params: { q: query }
    });

    const animes = response.data;

    if (animes.length === 0) {
      bot.sendMessage(chatId, `❌ Не знайшли аніме за запитом: "${query}"`);
      return;
    }

    let message = `🔍 *Результати пошуку для "${query}":*\n\n`;

    const keyboard = {
      reply_markup: {
        inline_keyboard: animes.slice(0, 5).map((anime) => [
          {
            text: `${anime.title} (⭐${anime.rating})`,
            url: `${SITE_URL}?search=${encodeURIComponent(anime.title)}`
          }
        ])
      }
    };

    animes.slice(0, 5).forEach((anime, index) => {
      message += `${index + 1}. *${anime.title}*\n`;
      message += `   ⭐ ${anime.rating}\n`;
      message += `   📅 ${anime.year}\n\n`;
    });

    message += `[Відкрити сайт](${SITE_URL})`;

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: keyboard.reply_markup,
      disable_web_page_preview: true
    });
  } catch (error) {
    console.error('Помилка при пошуку:', error.message);
    bot.sendMessage(chatId, '❌ Помилка при пошуку. Спробуй ще раз.');
  }
}

// ✅ Обробка помилок
bot.on('error', (error) => {
  console.error('🤖 Bot Error:', error);
});

bot.on('polling_error', (error) => {
  console.error('🤖 Polling Error:', error);
});

console.log('✅ Bot успішно запущений!');
