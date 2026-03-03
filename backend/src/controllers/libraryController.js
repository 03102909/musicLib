const prisma = require("../config/prisma");

const formatAlbum = (album) => ({
  id: album.id,
  title: album.title,
  release_year: album.release_year,
  description: album.description,
  cover_url: album.cover_url,
  created_at: album.created_at,
  artist: album.artists,
  genres: album.albums_genres.map((ag) => ag.genres),
});

const formatLibraryItem = (item) => ({
  id: item.id,
  rating: item.rating,
  added_at: item.added_at,
  album: formatAlbum(item.albums),
});

const getUserLibrary = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId) || 1;
    const library = await prisma.library_item.findMany({
      where: { user_id: userId },
      include: {
        albums: {
          include: {
            artists: true,
            albums_genres: { include: { genres: true } },
          },
        },
      },
    });
    res.json(library.map(formatLibraryItem));
  } catch (error) {
    next(error);
  }
};

const addToLibrary = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId) || 1;
    const { album_id, rating } = req.body;
    const item = await prisma.library_item.create({
      data: {
        user_id: userId,
        album_id,
        rating,
      },
      include: {
        albums: {
          include: {
            artists: true,
            albums_genres: { include: { genres: true } },
          },
        },
      },
    });
    res.status(201).json(formatLibraryItem(item));
  } catch (error) {
    next(error);
  }
};

const updateLibraryItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { rating } = req.body;
    const item = await prisma.library_item.update({
      where: { id },
      data: { rating },
      include: {
        albums: {
          include: {
            artists: true,
            albums_genres: { include: { genres: true } },
          },
        },
      },
    });
    res.json(formatLibraryItem(item));
  } catch (error) {
    next(error);
  }
};

const deleteLibraryItem = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.library_item.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserLibrary,
  addToLibrary,
  updateLibraryItem,
  deleteLibraryItem,
};
