import axios from 'axios';
import { Album, LibraryItem, Artist, Genre, ChartDataYear, ChartDataGenre } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3003/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAlbums = async (): Promise<Album[]> => {
  const { data } = await api.get('/albums');
  return data;
};

export const getAlbumById = async (id: number): Promise<Album> => {
  const { data } = await api.get(`/albums/${id}`);
  return data;
};

export const getArtists = async (): Promise<Artist[]> => {
  const { data } = await api.get('/artists');
  return data;
};

export const getGenres = async (): Promise<Genre[]> => {
  const { data } = await api.get('/genres');
  return data;
};

export const getUserLibrary = async (userId: number = 1): Promise<LibraryItem[]> => {
  const { data } = await api.get(`/users/${userId}/library`);
  return data;
};

export const addToLibrary = async (albumId: number, rating?: number | null, userId: number = 1): Promise<LibraryItem> => {
  const { data } = await api.post(`/users/${userId}/library`, {
    album_id: albumId,
    rating,
  });
  return data;
};

export const updateLibraryItem = async (libraryItemId: number, rating: number | null): Promise<LibraryItem> => {
  const { data } = await api.put(`/library/${libraryItemId}`, { rating });
  return data;
};

export const removeLibraryItem = async (libraryItemId: number): Promise<void> => {
  await api.delete(`/library/${libraryItemId}`);
};

// diagrams
export const getAlbumsCountByYear = async (): Promise<ChartDataYear[]> => {
  const { data } = await api.get('/charts/countByYear');
  return data;
};

export const getAlbumsCountByGenre = async (): Promise<ChartDataGenre[]> => {
  const { data } = await api.get('/charts/countByGenre');
  return data;
};

// admin
export const createAlbum = async (albumData: any): Promise<Album> => {
  const { data } = await api.post('/albums', albumData);
  return data;
};

export const updateAlbum = async (id: number, albumData: any): Promise<Album> => {
  const { data } = await api.put(`/albums/${id}`, albumData);
  return data;
};

export const deleteAlbum = async (id: number): Promise<void> => {
  await api.delete(`/albums/${id}`);
};

// data port (import/export)
export const importFromExcel = async (file: File): Promise<{ message: string; imported: number; skipped: number }> => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await api.post('/data-port/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const exportToExcel = async (): Promise<void> => {
  const response = await api.get('/data-port/export', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  const today = new Date().toISOString().slice(0, 10);
  link.setAttribute('download', `music_library_${today}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export default api;
