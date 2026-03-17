import { useState } from "react";
import RatingStars from "../components/RatingStars";

const mockLibrary = [
  {
    id: 1,
    albumId: 1,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    rating: 5,
    addedAt: "2025-12-15",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    genres: ["Rock", "Grunge"],
  },
  {
    id: 2,
    albumId: 3,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    rating: 4,
    addedAt: "2025-11-20",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    genres: ["Rock", "Pop"],
  },
  {
    id: 3,
    albumId: 4,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    rating: 5,
    addedAt: "2026-01-05",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg",
    genres: ["Jazz"],
  },
  {
    id: 4,
    albumId: 6,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    rating: 3,
    addedAt: "2026-02-10",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    genres: ["Pop", "R&B"],
  },
  {
    id: 5,
    albumId: 7,
    title: "OK Computer",
    artist: "Radiohead",
    year: 1997,
    rating: 4,
    addedAt: "2026-03-01",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
    genres: ["Rock", "Electronic"],
  },
];

export default function LibraryPage() {
  const [items, setItems] = useState(mockLibrary);

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">
            Моя бібліотека
          </h1>
          <p className="text-muted text-lg mt-2">
            <span className="text-deep-red font-semibold">{items.length}</span> альбомів у вашій колекції
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm bg-base-300 text-cream border-base-400/50 hover:bg-base-400 gap-2">
            Імпорт
          </button>
          <button className="btn btn-sm bg-base-300 text-cream border-base-400/50 hover:bg-base-400 gap-2">
            Експорт
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden bg-base-200 border border-base-300/50 hover:border-forest/40 transition-colors duration-200 group"
            >
              <figure className="relative aspect-square overflow-hidden bg-gradient-to-br from-deep-red/30 to-forest/30 group">
                {item.coverUrl ? (
                  <img
                    src={item.coverUrl}
                    alt={`${item.title} — ${item.artist}`}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : null}
                {/* Delete button overlay */}
                <button
                  className="absolute top-2 right-2 z-20 btn btn-circle btn-xs bg-base-100/70 border-none text-muted hover:bg-deep-red hover:text-cream transition-all opacity-0 group-hover:opacity-100"
                  onClick={() => handleDelete(item.id)}
                  title="Видалити"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </figure>
              <div className="p-4">
                <h3 className="font-display font-semibold text-lg text-cream leading-tight line-clamp-1 group-hover:text-forest transition-colors">
                  {item.title}
                </h3>
                <p className="text-base text-muted mt-1">{item.artist}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-base text-steel">{item.year}</span>
                  {item.genres.slice(0, 2).map((g) => (
                    <span
                      key={g}
                      className="text-sm text-muted/60 before:content-['·'] before:mr-1"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <RatingStars
                    value={item.rating}
                    name={`rating-${item.id}`}
                    size="xs"
                  />
                  <span className="text-xs text-muted">
                    {new Date(item.addedAt).toLocaleDateString("uk-UA")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-display text-xl font-semibold text-cream mb-2">Бібліотека порожня</h3>
          <p className="text-muted text-base mb-4">Додайте альбоми з каталогу до своєї колекції</p>
          <a href="/" className="text-forest hover:text-deep-red transition-colors text-base font-medium">
            Перейти до каталогу
          </a>
        </div>
      )}
    </div>
  );
}
