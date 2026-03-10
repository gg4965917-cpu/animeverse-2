import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, Play, Loader, AlertCircle, Flame } from 'lucide-react';

export default function AnimeViewer() {
  const [animeList, setAnimeList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Використовуємо Jikan API (MyAnimeList) - безплатна, без реєстрації
  const API_BASE_URL = 'https://api.jikan.moe/v4';

  // Fetch аніме при завантаженні та змінах пошуку/жанру
  useEffect(() => {
    fetchAnime();
  }, [selectedGenre, page]);

  // Fetch пошуку при зміні пошукового терміну (з затримкою)
  useEffect(() => {
    if (searchTerm.trim()) {
      const timer = setTimeout(() => {
        setPage(1);
        searchAnime();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setPage(1);
      fetchAnime();
    }
  }, [searchTerm]);

  // Fetch жанрів при завантаженні компонента
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/genres/anime`);
      const data = await response.json();
      if (data.data) {
        const genreList = data.data.map(g => ({
          id: g.mal_id,
          name: g.name
        }));
        setGenres(genreList);
      }
    } catch (err) {
      console.error('Помилка при завантаженні жанрів:', err);
    }
  };

  const fetchAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_BASE_URL}/anime?page=${page}&limit=20&order_by=score&sort=desc&min_score=6`;

      if (selectedGenre !== 'all') {
        url += `&genres=${selectedGenre}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Помилка при завантаженні');

      const data = await response.json();
      const formatted = data.data.map(anime => ({
        _id: anime.mal_id,
        title: anime.title,
        genre: anime.genres?.[0]?.name || 'Unknown',
        year: anime.year || new Date().getFullYear(),
        rating: anime.score || 0,
        episodes: anime.episodes || 12,
        image: anime.images.jpg.large_image_url,
        status: anime.status || 'Unknown',
        description: anime.synopsis || 'Немає опису',
        studio: anime.studios?.[0]?.name || 'Unknown',
        url: anime.url
      }));
      setAnimeList(formatted);
    } catch (err) {
      console.error('Помилка при завантаженні аніме:', err);
      setError('Не вдалося завантажити аніме. Перевірте інтернет-з\'єднання.');
    } finally {
      setLoading(false);
    }
  };

  const searchAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE_URL}/anime?query=${encodeURIComponent(searchTerm)}&page=1&limit=20`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Помилка при пошуку');

      const data = await response.json();
      const formatted = data.data.map(anime => ({
        _id: anime.mal_id,
        title: anime.title,
        genre: anime.genres?.[0]?.name || 'Unknown',
        year: anime.year || new Date().getFullYear(),
        rating: anime.score || 0,
        episodes: anime.episodes || 12,
        image: anime.images.jpg.large_image_url,
        status: anime.status || 'Unknown',
        description: anime.synopsis || 'Немає опису',
        studio: anime.studios?.[0]?.name || 'Unknown',
        url: anime.url
      }));
      setAnimeList(formatted);
    } catch (err) {
      console.error('Помилка при пошуку:', err);
      setError('Не вдалося виконати пошук. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayClick = (animeTitle, url) => {
    // Відкрити аніме на MyAnimeList
    window.open(url, '_blank');
  };

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 backdrop-blur-md bg-black/40 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center gap-3 mb-8">
              <Flame className="w-8 h-8 text-cyan-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AnimeVerse
              </h1>
            </div>

            {/* Connection Status */}
            <div className="mb-4 text-xs text-gray-400">
              {loading && searchTerm === '' ? (
                <span>🔄 Завантаження...</span>
              ) : error ? (
                <span className="text-red-400">⚠️ {error}</span>
              ) : (
                <span className="text-green-400">✅ Підключено до Jikan API (MyAnimeList)</span>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative group mb-6">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-purple-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Пошук аніме..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/60 border border-purple-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>

            {/* Genre Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedGenre('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                  selectedGenre === 'all'
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-black shadow-lg shadow-cyan-400/50'
                    : 'bg-black/40 border border-purple-500/30 text-gray-300 hover:border-purple-400 hover:text-white'
                }`}
              >
                ✨ Все
              </button>
              {genres.slice(0, 8).map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-300 ${
                    selectedGenre === genre.id
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-black shadow-lg shadow-cyan-400/50'
                      : 'bg-black/40 border border-purple-500/30 text-gray-300 hover:border-purple-400 hover:text-white'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Error Display */}
        {error && (
          <div className="max-w-7xl mx-auto px-6 py-6 mt-4">
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-300 mb-1">Помилка завантаження</h3>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Anime Grid */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
              <p className="text-gray-300">Завантаження аніме...</p>
            </div>
          ) : animeList.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {animeList.map((anime, index) => (
                  <div
                    key={anime._id}
                    onMouseEnter={() => setHoveredId(anime._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="group cursor-pointer h-full"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.05}s backwards`
                    }}
                  >
                    <style>{`
                      @keyframes fadeInUp {
                        from {
                          opacity: 0;
                          transform: translateY(20px);
                        }
                        to {
                          opacity: 1;
                          transform: translateY(0);
                        }
                      }
                    `}</style>

                    <div className="relative h-96 rounded-xl overflow-hidden">
                      {/* Image */}
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x600?text=No+Image';
                        }}
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                      {/* Content overlay */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
                        {/* Status badge */}
                        <div className="flex justify-between items-start">
                          <span className="inline-block bg-cyan-400/80 text-black px-3 py-1 rounded-full text-xs font-bold">
                            {anime.status}
                          </span>
                          <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold">{anime.rating.toFixed(1)}</span>
                          </div>
                        </div>

                        {/* Title and info - visible on hover */}
                        <div className="transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2">{anime.title}</h3>
                          <div className="space-y-1 text-xs text-gray-300 mb-3">
                            <p>Жанр: {anime.genre}</p>
                            <p>Рік: {anime.year}</p>
                            <p>Епізодів: {anime.episodes}</p>
                            <p>Студія: {anime.studio}</p>
                          </div>
                          <button
                            onClick={() => handlePlayClick(anime.title, anime.url)}
                            className="w-full bg-gradient-to-r from-cyan-400 to-purple-400 text-black py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
                          >
                            <Play className="w-4 h-4" />
                            На MAL
                          </button>
                        </div>
                      </div>

                      {/* Border glow effect on hover */}
                      <div className="absolute inset-0 rounded-xl border border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className="px-6 py-2 rounded-lg bg-black/40 border border-purple-500/30 text-white hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  ← Назад
                </button>
                <span className="text-gray-400 font-semibold">Сторінка {page}</span>
                <button
                  onClick={handleNextPage}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
                >
                  Далі →
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">Аніме не знайдено</h3>
              <p className="text-gray-500">Спробуй інший пошук або фільтр</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 backdrop-blur-md bg-black/40 mt-12">
          <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400 text-sm">
            <p>Дані беруться з <a href="https://jikan.moe" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Jikan API (MyAnimeList)</a></p>
          </div>
        </footer>
      </div>
    </div>
  );
}
