import { useState } from "react";
import AlbumFormModal from "../components/AlbumFormModal";

const Catalog = [
  { id: 1, title: "Nevermind", artist: "Nirvana", year: 1991, genres: ["Rock", "Grunge"] },
  { id: 2, title: "Random Access Memories", artist: "Daft Punk", year: 2013, genres: ["Electronic", "Disco"] },
  { id: 3, title: "Abbey Road", artist: "The Beatles", year: 1969, genres: ["Rock", "Pop"] },
  { id: 4, title: "Kind of Blue", artist: "Miles Davis", year: 1959, genres: ["Jazz"] },
  { id: 5, title: "The Dark Side of the Moon", artist: "Pink Floyd", year: 1973, genres: ["Rock", "Progressive"] },
  { id: 6, title: "Thriller", artist: "Michael Jackson", year: 1982, genres: ["Pop", "R&B"] },
  { id: 7, title: "OK Computer", artist: "Radiohead", year: 1997, genres: ["Rock", "Electronic"] },
  { id: 8, title: "To Pimp a Butterfly", artist: "Kendrick Lamar", year: 2015, genres: ["Hip-Hop", "Jazz"] },
];

export default function AdminCatalogPage() {
  const [albums, setAlbums] = useState(Catalog);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editAlbum, setEditAlbum] = useState<typeof Catalog[0] | null>(null);

  const handleAdd = () => {
    setModalMode("add");
    setEditAlbum(null);
    setModalOpen(true);
  };

  const handleEdit = (album: typeof Catalog[0]) => {
    setModalMode("edit");
    setEditAlbum(album);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setAlbums(albums.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">
              Керування каталогом
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-deep-red animate-pulse" title="Адмін-режим" />
          </div>
          <p className="text-muted text-lg mt-1">Адміністрування альбомів</p>
        </div>
        <button
          className="btn btn-sm bg-forest text-base-100 hover:bg-forest/80 border-none gap-2"
          onClick={handleAdd}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Додати альбом
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-base-300/40 border border-deep-red/30 border-l-4 border-l-deep-red rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-deep-red shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-lg text-muted">
          Ви авторизовані як <span className="text-deep-red font-medium">адміністратор</span>. Зміни видимі всім користувачам.
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-base-300/50">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-300/50 text-muted text-sm uppercase tracking-wider">
              <th className="font-medium">ID</th>
              <th className="font-medium">Назва</th>
              <th className="font-medium">Виконавець</th>
              <th className="font-medium">Рік</th>
              <th className="font-medium">Жанри</th>
              <th className="font-medium text-center">Дії</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id} className="border-t border-base-300/30 hover:bg-base-300/20 transition-colors">
                <td className="text-muted font-mono text-sm">{album.id}</td>
                <td className="text-cream font-medium text-lg">{album.title}</td>
                <td className="text-muted text-lg">{album.artist}</td>
                <td className="text-steel text-lg">{album.year}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {album.genres.map((g) => (
                      <span key={g} className="text-xs px-1.5 py-0.5 rounded bg-base-300 text-muted">
                        {g}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center gap-1">
                    <button
                      className="btn btn-ghost btn-xs text-muted hover:text-forest transition-colors"
                      onClick={() => handleEdit(album)}
                      title="Редагувати"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      className="btn btn-ghost btn-xs text-muted hover:text-deep-red transition-colors"
                      onClick={() => handleDelete(album.id)}
                      title="Видалити"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlbumFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        album={
          editAlbum
            ? {
                title: editAlbum.title,
                artist: editAlbum.artist,
                year: editAlbum.year,
                description: "",
                coverUrl: "",
                genres: editAlbum.genres,
              }
            : undefined
        }
      />
    </div>
  );
}
