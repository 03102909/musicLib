import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import AlbumCard from "../components/AlbumCard";
import { getAlbums } from "../services/api";

const ALL_GENRES_LABEL = "Усі";

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState(ALL_GENRES_LABEL);

  const { data: albums = [], isLoading, isError } = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
  });

  const allGenres = useMemo(() => {
    const genresSet = new Set<string>();
    albums.forEach((album) => {
      album.genres.forEach((g) => genresSet.add(g.name));
    });
    return [ALL_GENRES_LABEL, ...Array.from(genresSet).sort()];
  }, [albums]);

  const filtered = albums.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.artist.name.toLowerCase().includes(search.toLowerCase());
    
    const matchGenre =
      genre === ALL_GENRES_LABEL ||
      a.genres.some((g) => g.name === genre);
      
    return matchSearch && matchGenre;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-forest w-12 h-12"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-deep-red">
        <p className="text-xl">Помилка завантаження каталогу. Спробуйте пізніше.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">
          Каталог альбомів
        </h1>
        <p className="text-muted text-lg">
          Досліджуйте колекцію з <span className="text-deep-red font-semibold">{albums.length}</span> альбомів від культових виконавців
        </p>
      </section>

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

      <p className="text-base text-muted mb-4">
        Знайдено: <span className="text-deep-red font-semibold">{filtered.length}</span> альбомів
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              artist={album.artist.name}
              year={album.release_year}
              coverUrl={album.cover_url}
              genres={album.genres.map(g => g.name)}
            />
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
