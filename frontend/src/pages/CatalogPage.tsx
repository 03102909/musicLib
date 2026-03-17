import { useState } from "react";
import AlbumCard from "../components/AlbumCard";

const mockAlbums = [
  {
    id: 1,
    title: "Nevermind",
    artist: "Nirvana",
    year: 1991,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    genres: ["Rock", "Grunge"],
  },
  {
    id: 5,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    year: 1973,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png",
    genres: ["Rock", "Progressive"],
  },
  {
    id: 6,
    title: "Thriller",
    artist: "Michael Jackson",
    year: 1982,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
    genres: ["Pop", "R&B"],
  },
  {
    id: 7,
    title: "OK Computer",
    artist: "Radiohead",
    year: 1997,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
    genres: ["Rock", "Electronic"],
  },
  {
    id: 8,
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    year: 2015,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
    genres: ["Hip-Hop", "Jazz"],
  },
    {
    id: 2,
    title: "Random Access Memories",
    artist: "Daft Punk",
    year: 2013,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
    genres: ["Electronic", "Disco"],
  },
  {
    id: 3,
    title: "Abbey Road",
    artist: "The Beatles",
    year: 1969,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
    genres: ["Rock", "Pop"],
  },
  {
    id: 4,
    title: "Kind of Blue",
    artist: "Miles Davis",
    year: 1959,
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/9/9c/MilesDavisKindofBlue.jpg",
    genres: ["Jazz"],
  },
];

const allGenres = ["Усі", "Rock", "Pop", "Jazz", "Electronic", "Hip-Hop", "R&B", "Grunge", "Progressive", "Disco"];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Усі");

  const filtered = mockAlbums.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "Усі" || a.genres.includes(genre);
    return matchSearch && matchGenre;
  });

  return (
    <div>
      <section className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
          Каталог альбомів
        </h1>
        <p className="text-muted text-lg">
          Досліджуйте колекцію з <span className="text-deep-red font-semibold">{mockAlbums.length}</span> альбомів від культових виконавців
        </p>
      </section>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Шукати альбом або виконавця..."
            className="input input-bordered bg-base-200 border-base-300 w-full text-lg focus:border-forest focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Genre pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {allGenres.map((g) => (
          <button
            key={g}
            className={`px-4 py-2 rounded text-base font-medium transition-all ${
              genre === g
                ? "bg-forest text-base-100"
                : "bg-base-200 text-muted hover:text-cream hover:bg-base-300 border border-base-300"
            }`}
            onClick={() => setGenre(g)}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-base text-muted mb-4">
        Знайдено: <span className="text-deep-red font-semibold">{filtered.length}</span> альбомів
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="font-display text-2xl font-semibold text-cream mb-2">Нічого не знайдено</h3>
          <p className="text-muted text-lg">Спробуйте змінити пошуковий запит або фільтр</p>
        </div>
      )}
    </div>
  );
}
