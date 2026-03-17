type AlbumFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  album?: {
    title: string;
    artist: string;
    year: number;
    description: string;
    coverUrl: string;
    genres: string[];
  };
};

const allGenres = ["Rock", "Pop", "Jazz", "Electronic", "Hip-Hop", "Classical", "R&B", "Metal", "Indie", "Folk"];

export default function AlbumFormModal({
  isOpen,
  onClose,
  mode,
  album,
}: AlbumFormModalProps) {
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

        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
              Назва альбому
            </label>
            <input
              type="text"
              placeholder="Назва"
              className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
              defaultValue={album?.title || ""}
            />
          </div>

          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
              Виконавець
            </label>
            <input
              type="text"
              placeholder="Виконавець"
              className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
              defaultValue={album?.artist || ""}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
                Рік
              </label>
              <input
                type="number"
                placeholder="Рік"
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
                defaultValue={album?.year || 2024}
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
                placeholder="https://..."
                className="input input-bordered bg-base-300 border-base-400/50 w-full text-base text-cream focus:border-forest focus:outline-none"
                defaultValue={album?.coverUrl || ""}
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted uppercase tracking-wider font-medium block mb-1.5">
              Опис
            </label>
            <textarea
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
              {allGenres.map((genre) => (
                <label key={genre} className="cursor-pointer flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-xs border-base-400"
                    defaultChecked={album?.genres?.includes(genre)}
                  />
                  <span className="text-sm text-muted">{genre}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-base-300">
            <button className="btn btn-sm btn-ghost text-muted" type="button" onClick={onClose}>
              Скасувати
            </button>
            <button className="btn btn-sm bg-forest text-base-100 hover:bg-forest/80 border-none" type="submit">
              {mode === "add" ? "Додати" : "Зберегти"}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop bg-black/60" onClick={onClose} />
    </dialog>
  );
}
