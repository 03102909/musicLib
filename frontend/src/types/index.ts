export type Artist = {
  id: number;
  name: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Album = {
  id: number;
  title: string;
  release_year: number;
  description: string | null;
  cover_url: string | null;
  artist_id: number;
  created_at: string | null;
  artist: Artist;
  genres: Genre[];
};

export type LibraryItem = {
  id: number;
  user_id: number;
  album_id: number;
  rating: number | null;
  added_at: string | null;
  albums: Album;
};

export type User = {
  id: number;
  email: string;
  role: string | null;
  created_at: string | null;
};
