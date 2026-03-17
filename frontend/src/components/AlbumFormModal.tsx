import { Artist, Genre } from "../types";

export type AlbumFormData = {
  title: string;
  artist_id: number;
  release_year: number;
  description: string;
  cover_url: string;
  genreIds: number[];
};

type AlbumFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  album?: AlbumFormData;
  artists: Artist[];
  genres: Genre[];
  onSubmit: (data: AlbumFormData) => void;
  isPending: boolean;
};

export default function AlbumFormModal({
  isOpen,
  onClose,
  mode,
  album,
  artists,
  genres,
  onSubmit,
  isPending
}: AlbumFormModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const artist_id = Number(formData.get("artist_id"));
    const release_year = Number(formData.get("release_year"));
    const cover_url = formData.get("cover_url") as string;
    const description = formData.get("description") as string;
    const genreIds = formData.getAll("genreIds").map(Number);
    if (!title || !artist_id) {
       alert("Заповніть обов'язкові поля: назва та виконавець");
       return;
    }
    onSubmit({ title, artist_id, release_year, cover_url, description, genreIds });
  };
  return (
    <dialog className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box bg-base-200 border border-base-300/50 max-w-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-muted hover:text-cream"
          onClick={onClose}
          aria-label="Закрити"
        >
          ✕
        </button>

        <h3 className="font-display text-xl font-bold text-cream mb-6">
          {mode === "add" ? "Додати новий альбом" : "Редагувати альбом"}
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5 border-l-2 border-deep-red pl-2 ml-1" title="Обов'язкове поле">
              Назва альбому *
            </label>
            <input
              type="text"
              name="title"
              placeholder="Назва"
              className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
              defaultValue={album?.title || ""}
            />
          </div>

          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5 border-l-2 border-deep-red pl-2 ml-1" title="Обов'язкове поле">
              Виконавець *
            </label>
            <select
              name="artist_id"
              className="select select-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
              defaultValue={album?.artist_id || ""}
            >
              <option value="" disabled>Оберіть виконавця</option>
              {artists.map((artist) => (
                <option key={artist.id} value={artist.id}>
                  {artist.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
                Рік
              </label>
              <input
                type="number"
                name="release_year"
                placeholder="Рік"
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
                defaultValue={album?.release_year || 2024}
                min={1900}
                max={2030}
              />
            </div>
            <div>
              <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
                URL обкладинки
              </label>
              <input
                type="url"
                name="cover_url"
                placeholder="https://..."
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
                defaultValue={album?.cover_url || ""}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
              Опис
            </label>
            <textarea
              name="description"
              placeholder="Опис альбому..."
              className="textarea textarea-bordered bg-base-300 border-base-400/50 w-full h-24 text-base text-cream focus:border-forest focus:outline-none"
              defaultValue={album?.description || ""}
            />
          </div>

          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-2">
              Жанри
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <label key={genre.id} className="cursor-pointer flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    name="genreIds"
                    value={genre.id}
                    className="checkbox checkbox-xs border-base-400"
                    defaultChecked={album?.genreIds?.includes(genre.id)}
                  />
                  <span className="text-sm text-muted">{genre.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-base-300">
            <button className="btn btn-sm btn-ghost text-muted" type="button" onClick={onClose}>
              Скасувати
            </button>
            <button className="btn btn-sm bg-forest text-base-100 hover:bg-forest/80 border-none" type="submit" disabled={isPending}>
              {isPending ? "Збереження..." : (mode === "add" ? "Додати" : "Зберегти")}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/60" onClick={onClose} />
    </dialog>
  );
}
