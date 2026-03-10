const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Jikan API базова URL
const JIKAN_API = 'https://api.jikan.moe/v4';

// TTS API (Google Text-to-Speech)
const TTS_API = 'https://tts.google.com/api/tts';

// ✅ GET /api/anime - Отримати список аніме
app.get('/api/anime', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, search } = req.query;
    let url = `${JIKAN_API}/anime?page=${page}&limit=${limit}&order_by=score&sort=desc`;

    if (genre && genre !== 'all') {
      url += `&genres=${genre}`;
    }

    if (search) {
      url += `&query=${encodeURIComponent(search)}`;
    }

    const response = await axios.get(url);
    const data = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      title_english: anime.title_english,
      genre: anime.genres?.[0]?.name || 'Unknown',
      genres: anime.genres?.map(g => g.name) || [],
      year: anime.year,
      rating: anime.score || 0,
      episodes: anime.episodes || 0,
      image: anime.images.jpg.large_image_url,
      status: anime.status,
      synopsis: anime.synopsis,
      studio: anime.studios?.[0]?.name || 'Unknown',
      source: anime.source,
      aired: anime.aired?.string,
      url: anime.url,
      // Voice lines (для озвучки)
      voice_url: `https://api.animeverse.local/api/anime/${anime.mal_id}/voice`,
      voice_text: `Це ${anime.title}. ${anime.synopsis?.substring(0, 100) || 'Цікаве аніме'}`
    }));

    res.json({
      pagination: response.data.pagination,
      data: data
    });
  } catch (error) {
    console.error('Помилка:', error.message);
    res.status(500).json({ error: 'Помилка при завантаженні аніме' });
  }
});

// ✅ GET /api/anime/:id - Отримати конкретне аніме з озвучкою
app.get('/api/anime/:id', async (req, res) => {
  try {
    const response = await axios.get(`${JIKAN_API}/anime/${req.params.id}`);
    const anime = response.data.data;

    const result = {
      id: anime.mal_id,
      title: anime.title,
      title_english: anime.title_english,
      genres: anime.genres?.map(g => g.name) || [],
      year: anime.year,
      rating: anime.score,
      episodes: anime.episodes,
      image: anime.images.jpg.large_image_url,
      status: anime.status,
      synopsis: anime.synopsis,
      studio: anime.studios?.[0]?.name || 'Unknown',
      source: anime.source,
      aired: anime.aired?.string,
      url: anime.url,
      background: anime.background,
      ranked: anime.ranked,
      popularity: anime.popularity,
      // Озвучка
      voice_info: {
        title_voice: `https://api.animeverse.local/tts?text=${encodeURIComponent(anime.title)}&lang=uk`,
        synopsis_voice: `https://api.animeverse.local/tts?text=${encodeURIComponent(anime.synopsis?.substring(0, 500) || '')}`,
        status_voice: 'available'
      }
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при завантаженні даних' });
  }
});

// ✅ GET /api/genres - Отримати жанри
app.get('/api/genres', async (req, res) => {
  try {
    const response = await axios.get(`${JIKAN_API}/genres/anime`);
    const genres = response.data.data.map(g => ({
      id: g.mal_id,
      name: g.name
    }));
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при завантаженні жанрів' });
  }
});

// ✅ GET /api/search - Розширений пошук
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Потрібно передати параметр q' });

    const response = await axios.get(`${JIKAN_API}/anime?query=${encodeURIComponent(q)}&limit=10`);
    const data = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.image_url,
      rating: anime.score,
      year: anime.year
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при пошуку' });
  }
});

// ✅ GET /api/tts - Text-to-Speech озвучка
app.get('/api/tts', async (req, res) => {
  try {
    const { text, lang = 'uk' } = req.query;
    if (!text) return res.status(400).json({ error: 'Потрібен текст' });

    // Google TTS URL
    const audioUrl = `https://translate.google.com/translate_tts?client=tw-ob&sl=${lang}&tl=${lang}&q=${encodeURIComponent(text)}`;
    
    res.json({
      text: text,
      language: lang,
      audio_url: audioUrl
    });
  } catch (error) {
    res.status(500).json({ error: 'Помилка при генерації озвучки' });
  }
});

// ✅ GET /api/trending - Популярне аніме
app.get('/api/trending', async (req, res) => {
  try {
    const response = await axios.get(`${JIKAN_API}/anime?order_by=score&sort=desc&limit=10`);
    const data = response.data.data.map(anime => ({
      id: anime.mal_id,
      title: anime.title,
      image: anime.images.jpg.large_image_url,
      rating: anime.score,
      episodes: anime.episodes
    }));

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Помилка при завантаженні тренду' });
  }
});

// ✅ GET /api/health - Статус сервера
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ Сервер працює',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// ✅ Static файли (для фронтенду)
app.use(express.static('dist'));

// ✅ Fallback для React Router
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// Помилки обробка
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Внутрішня помилка сервера' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎬 AnimeVerse API запущений на http://localhost:${PORT}`);
  console.log(`📡 API готовий: http://localhost:${PORT}/api/anime`);
  console.log(`🔊 TTS озвучка: http://localhost:${PORT}/api/tts?text=Hello&lang=uk`);
});

module.exports = app;
