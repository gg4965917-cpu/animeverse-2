# 🎬 AnimeVerse - Сайт для перегляду аніме з MongoDB

Повнофункціональний сайт для перегляду аніме з базою даних MongoDB та REST API на Node.js/Express.

## 📋 Вміст проекту

```
.
├── server.js              # Express сервер з API
├── seed.js               # Скрипт для заповнення БД
├── package.json          # Залежності Node.js
├── .env.example          # Приклад конфігурації
└── anime-viewer-api.jsx  # React компонент (Frontend)
```

---

## 🚀 Швидкий старт

### 1️⃣ Встановлення Node.js залежностей

```bash
npm install
```

Цей крок встановить:
- `express` - веб-фреймворк
- `mongoose` - драйвер для MongoDB
- `cors` - для кроссдоменних запитів
- `dotenv` - для конфігурації
- `nodemon` - для автоперезавантаження під час розробки

### 2️⃣ Налаштування MongoDB

#### Варіант A: Локальний MongoDB

**На Windows:**
1. Завантажити з https://www.mongodb.com/try/download/community
2. Встановити та запустити MongoDB сервіс
3. MongoDB буде доступна на `mongodb://localhost:27017`

**На macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**На Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

#### Варіант B: MongoDB Atlas (Cloud)

1. Перейти на https://www.mongodb.com/cloud/atlas
2. Створити безплатний обліковий запис
3. Створити cluster
4. Отримати connection string: `mongodb+srv://username:password@cluster.mongodb.net/anime-db`
5. Скопіювати його в `.env` файл

### 3️⃣ Конфігурація

Створити файл `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

Вміст `.env`:
```
MONGO_URI=mongodb://localhost:27017/anime-db
PORT=5000
```

### 4️⃣ Заповнення БД прикладними даними

```bash
npm run seed
```

Цей скрипт додасть 12 популярних аніме в базу:
- Attack on Titan
- Death Note
- Demon Slayer
- Your Name
- Jujutsu Kaisen
- Steins;Gate
- Tokyo Ghoul
- Vinland Saga
- Cowboy Bebop
- Neon Genesis Evangelion
- My Hero Academia
- Fullmetal Alchemist

### 5️⃣ Запуск сервера

**Для розробки (з автоперезавантаженням):**
```bash
npm run dev
```

**Для production:**
```bash
npm start
```

Сервер запуститься на `http://localhost:5000`

---

## 📡 API Endpoints

### GET /api/anime
Отримати все аніме з опціональної фільтрацією

```bash
# Все аніме
GET http://localhost:5000/api/anime

# За жанром
GET http://localhost:5000/api/anime?genre=Action

# По пошуку
GET http://localhost:5000/api/anime?search=Death

# Комбінована фільтрація
GET http://localhost:5000/api/anime?genre=Action&search=Attack
```

**Відповідь:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Attack on Titan",
    "genre": "Action",
    "year": 2013,
    "rating": 9.0,
    "episodes": 76,
    "image": "https://...",
    "status": "Completed",
    "description": "...",
    "director": "Tetsuya Nakamura",
    "studio": "Wit Studio / MAPPA",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### GET /api/anime/:id
Отримати інформацію про конкретне аніме

```bash
GET http://localhost:5000/api/anime/507f1f77bcf86cd799439011
```

### POST /api/anime
Додати нове аніме в БД

```bash
curl -X POST http://localhost:5000/api/anime \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Anime",
    "genre": "Action",
    "year": 2024,
    "rating": 8.5,
    "episodes": 13,
    "image": "https://...",
    "status": "Ongoing",
    "description": "...",
    "director": "Director Name",
    "studio": "Studio Name"
  }'
```

### PUT /api/anime/:id
Оновити інформацію про аніме

```bash
curl -X PUT http://localhost:5000/api/anime/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"rating": 9.5}'
```

### DELETE /api/anime/:id
Видалити аніме з БД

```bash
curl -X DELETE http://localhost:5000/api/anime/507f1f77bcf86cd799439011
```

### GET /api/genres
Отримати список всіх жанрів

```bash
GET http://localhost:5000/api/genres
```

**Відповідь:**
```json
["all", "Action", "Adventure", "Horror", "Romance", "Sci-Fi", "Thriller"]
```

### GET /api/health
Перевірити статус сервера

```bash
GET http://localhost:5000/api/health
```

---

## 🎨 Frontend (React компонент)

### Використання

Імпортувати компонент в React додаток:

```jsx
import AnimeViewer from './anime-viewer-api';

export default function App() {
  return <AnimeViewer />;
}
```

### Фічі Frontend

✅ **Динамічне завантаження даних** - автоматично завантажується з API
✅ **Пошук в реальному часі** - фільтрація по назві аніме
✅ **Фільтрація за жанрами** - динамично завантажуються з БД
✅ **Обробка помилок** - показує статус підключення
✅ **Красивий UI** - темна тема з неон-подібними ефектами
✅ **Адаптивний дизайн** - працює на всіх екранах

### Змінні конфігурації

У файлі `anime-viewer-api.jsx` можна змінити:

```jsx
const API_BASE_URL = 'http://localhost:5000/api'; // URL вашого API
```

---

## 🐛 Розв'язання проблем

### Помилка: "Cannot find module 'express'"
```bash
npm install
```

### Помилка: "MongoDB connection refused"
1. Переконайтесь, що MongoDB запущена
2. Перевірьте MONGO_URI в файлі `.env`
3. Для MongoDB Atlas - переконайтесь у правильності пароля

### Помилка: "CORS error"
Перевірьте, що CORS включений на сервері (уже включений у server.js)

### Сторінка показує "Помилка з'єднання"
1. Переконайтесь, що сервер запущений: `npm run dev`
2. Перевірьте порт 5000 чи він вільний
3. Перевірте URL у файлі `anime-viewer-api.jsx`

---

## 📦 Структура даних Anime

```javascript
{
  title: String,           // Назва аніме (унікальна)
  genre: String,          // Жанр (Action, Thriller, etc.)
  year: Number,           // Рік випуску
  rating: Number,         // Рейтинг (0-10)
  episodes: Number,       // Кількість епізодів
  image: String,          // URL зображення
  status: String,         // Completed, Ongoing, Movie
  description: String,    // Опис (опціонально)
  director: String,       // Режисер (опціонально)
  studio: String,         // Студія (опціонально)
  createdAt: Date         // Дата створення (автоматично)
}
```

---

## 🔧 Додавання нового аніме

### Через API (curl):
```bash
curl -X POST http://localhost:5000/api/anime \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Коджо Нейм",
    "genre": "Action",
    "year": 2024,
    "rating": 8.9,
    "episodes": 13,
    "image": "https://example.com/image.jpg",
    "status": "Ongoing",
    "description": "Нове аніме",
    "director": "Автор",
    "studio": "Студія"
  }'
```

### Через код Node.js:
```javascript
const newAnime = {
  title: "Коджо Нейм",
  genre: "Action",
  year: 2024,
  rating: 8.9,
  episodes: 13,
  image: "https://...",
  status: "Ongoing",
  description: "Нове аніме",
  director: "Автор",
  studio: "Студія"
};

fetch('http://localhost:5000/api/anime', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newAnime)
})
.then(res => res.json())
.then(data => console.log('Додано:', data));
```

---

## 🌟 Майбутні вдосконалення

- 🎥 Інтеграція з відеоплеєром
- ⭐ Система рейтингу та коментарів
- 👤 Система облікових записів користувачів
- 📋 Списки "Watch Later" / "Favorites"
- 🔐 Admin панель для управління аніме
- 📱 Мобільний додаток

---

## 📄 Ліцензія

MIT

---

## 💬 Питання?

Переконайтесь, що:
1. ✅ Node.js встановлений (`node --version`)
2. ✅ MongoDB запущена
3. ✅ Залежності встановлені (`npm install`)
4. ✅ .env файл налаштований
5. ✅ Сервер запущений на порту 5000

Успіхів в розробці! 🚀
