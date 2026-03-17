import axios from 'axios';
import { Album, LibraryItem, Artist, Genre } from '../types';

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

// Admin Endpoints
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

// Reference Data Endpoints
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

export default api;
