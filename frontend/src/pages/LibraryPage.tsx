import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RatingStars from "../components/RatingStars";
import { getUserLibrary, removeLibraryItem, updateLibraryItem } from "../services/api";
import type { LibraryItem } from "../types";
import { useToast } from "../contexts/ToastContext";

export default function LibraryPage() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const { data: items = [], isLoading, isError } = useQuery({
    queryKey: ["library"],
    queryFn: () => getUserLibrary(),
  });

  const { mutate: handleDeleteItem } = useMutation({
    mutationFn: (id: number) => removeLibraryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
    },
    onError: () => {
      addToast("Не вдалося видалити альбом з бібліотеки", "error");
    }
  });

  const { mutate: handleUpdateRating } = useMutation({
    mutationFn: ({ id, rating }: { id: number; rating: number }) => updateLibraryItem(id, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
    },
    onError: () => {
      addToast("Не вдалося оновити рейтинг альбому", "error");
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("Ви дійсно хочете видалити цей альбом з бібліотеки?")) {
      handleDeleteItem(id);
    }
  };

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
        <p className="text-xl">Помилка завантаження бібліотеки. Спробуйте пізніше.</p>
      </div>
    );
  }

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
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item: LibraryItem) => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden bg-base-200 border border-base-300/50 hover:border-forest/40 transition-colors duration-200 group flex flex-col"
            >
              <figure className="relative aspect-square overflow-hidden bg-gradient-to-br from-deep-red/30 to-forest/30 group">
                {item.album.cover_url ? (
                  <img
                    src={item.album.cover_url}
                    alt={`${item.album.title} — ${item.album.artist.name}`}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                ) : null}
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
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-semibold text-lg text-cream leading-tight line-clamp-1 group-hover:text-forest transition-colors">
                    {item.album.title}
                  </h3>
                  <p className="text-base text-muted mt-1">{item.album.artist.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base text-steel">{item.album.release_year}</span>
                    {item.album.genres.slice(0, 2).map((g) => (
                      <span
                        key={g.id}
                        className="text-sm text-muted/60 before:content-['·'] before:mr-1"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between mt-auto">
                  <RatingStars
                    value={item.rating || 0}
                    name={`rating-${item.id}`}
                    size="xs"
                    onChange={(val) => handleUpdateRating({ id: item.id, rating: val })}
                  />
                  <span className="text-xs text-muted">
                    {new Date(item.added_at).toLocaleDateString("uk-UA")}
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
