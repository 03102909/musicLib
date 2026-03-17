import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlbums, getArtists, getGenres, createAlbum, updateAlbum, deleteAlbum } from "../services/api";
import AlbumFormModal, { AlbumFormData } from "../components/AlbumFormModal";
import type { Album } from "../types";
import { useToast } from "../contexts/ToastContext";

export default function AdminCatalogPage() {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editAlbum, setEditAlbum] = useState<Album | null>(null);

  const { data: albums = [], isLoading: isLoadingAlbums } = useQuery({ queryKey: ["albums"], queryFn: getAlbums });
  const { data: artists = [] } = useQuery({ queryKey: ["artists"], queryFn: getArtists });
  const { data: genres = [] } = useQuery({ queryKey: ["genres"], queryFn: getGenres });

  const createMutation = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      setModalOpen(false);
    },
    onError: () => addToast("Помилка створення альбому", "error")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => updateAlbum(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      setModalOpen(false);
    },
    onError: () => addToast("Помилка оновлення альбому", "error")
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAlbum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
    onError: () => addToast("Помилка видалення альбому", "error")
  });

  const handleAdd = () => {
    setModalMode("add");
    setEditAlbum(null);
    setModalOpen(true);
  };

  const handleEdit = (album: Album) => {
    setModalMode("edit");
    setEditAlbum(album);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Ви впевнені, що хочете видалити цей альбом? Ця дія незворотна!")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (data: AlbumFormData) => {
    if (modalMode === "add") {
      createMutation.mutate(data);
    } else if (modalMode === "edit" && editAlbum) {
      updateMutation.mutate({ id: editAlbum.id, data });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (isLoadingAlbums) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-forest w-12 h-12"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-cream">
              Керування каталогом
            </h1>
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
                <td className="text-muted text-lg">{album.artist?.name}</td>
                <td className="text-steel text-lg">{album.release_year}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {album.genres.map((g) => (
                      <span key={g.id} className="text-xs px-1.5 py-0.5 rounded bg-base-300 text-muted">
                        {g.name}
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
                      disabled={deleteMutation.isPending}
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
        key={modalMode === "add" ? "add" : `edit-${editAlbum?.id}`}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        artists={artists}
        genres={genres}
        onSubmit={handleSubmit}
        isPending={isPending}
        album={
          editAlbum
            ? {
                title: editAlbum.title,
                artist_id: editAlbum.artist?.id || 0,
                release_year: editAlbum.release_year,
                description: editAlbum.description || "",
                cover_url: editAlbum.cover_url || "",
                genreIds: editAlbum.genres.map(g => g.id),
              }
            : undefined
        }
      />
    </div>
  );
}
