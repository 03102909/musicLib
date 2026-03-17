import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import RatingStars from "../components/RatingStars";
import { getAlbumById, addToLibrary } from "../services/api";
import { useToast } from "../contexts/ToastContext";

export default function AlbumDetailPage() {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const { addToast } = useToast();

  const { data: album, isLoading, isError } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumById(albumId),
    enabled: !!albumId && !isNaN(albumId),
    retry: false,
  });

  const { mutate: handleAddToLibrary, isPending: isAdding } = useMutation({
    mutationFn: () => addToLibrary(albumId),
    onSuccess: () => {
       // Optional: could addToast("Added to library", "success") but user said no success messages.
    },
    onError: () => {
      addToast("Не вдалося додати альбом у бібліотеку.", "error");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-forest w-12 h-12"></span>
      </div>
    );
  }

  if (isError || !album) {
    return (
      <div className="text-center py-20">
        <h2 className="font-display text-3xl font-bold text-cream mb-2">Альбом не знайдено</h2>
        <p className="text-muted text-lg mb-6">Такого альбому немає в каталозі</p>
        <Link to="/" className="text-forest hover:text-deep-red transition-colors text-lg font-medium">
          Повернутися до каталогу
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="text-lg mb-6 flex items-center gap-2 text-muted">
        <Link to="/" className="hover:text-cream transition-colors">Каталог</Link>
        <span className="text-base-400">/</span>
        <span className="text-cream">{album.title}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-72 shrink-0">
          <div className="relative rounded-lg overflow-hidden border border-base-300/50 shadow-lg shadow-black/20 bg-gradient-to-br from-deep-red/30 to-forest/30 aspect-square">
            {album.cover_url ? (
               <img
                src={album.cover_url}
                alt={album.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : null}
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-1">
            {album.title}
          </h1>
          <p className="text-xl text-muted mb-4">
            <span className="text-steel">{album.artist.name}</span>
            <span className="text-deep-red mx-2">·</span>
            <span className="text-steel">{album.release_year}</span>
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {album.genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 rounded bg-base-300 text-base text-muted border border-base-400/50 border-l-2 border-l-deep-red/50"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="border-t border-base-300 pt-5 mb-6">
            <p className="text-lg text-cream/80 leading-relaxed">
              {album.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button 
              className="btn bg-forest text-base-100 hover:bg-forest/90 border-none text-lg px-6"
              onClick={() => handleAddToLibrary()}
              disabled={isAdding}
            >
              {isAdding ? "Додаємо..." : "Додати в бібліотеку"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
