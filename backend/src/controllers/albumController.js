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

const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await prisma.albums.findMany({
      include: {
        artists: true,
        albums_genres: { include: { genres: true } },
      },
    });
    res.json(albums.map(formatAlbum));
  } catch (error) {
    next(error);
  }
};

const getAlbumById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const album = await prisma.albums.findUnique({
      where: { id },
      include: {
        artists: true,
        albums_genres: { include: { genres: true } },
      },
    });
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }
    res.json(formatAlbum(album));
  } catch (error) {
    next(error);
  }
};

const createAlbum = async (req, res, next) => {
  try {
    const { title, release_year, description, cover_url, artist_id, genreIds } =
      req.body;

    if (!title || !release_year || !artist_id) {
      return res
        .status(400)
        .json({
          error: "Missing required fields: title, release_year, artist_id",
        });
    }

    const safeGenreIds = Array.isArray(genreIds) ? genreIds : [];

    const album = await prisma.albums.create({
      data: {
        title,
        release_year,
        description,
        cover_url,
        artist_id,
        albums_genres: {
          create: safeGenreIds.map((genreId) => ({
            genres: { connect: { id: genreId } },
          })),
        },
      },
      include: {
        artists: true,
        albums_genres: { include: { genres: true } },
      },
    });
    res.status(201).json(formatAlbum(album));
  } catch (error) {
    next(error);
  }
};

const updateAlbum = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, release_year, description, cover_url, artist_id, genreIds } =
      req.body;

    const data = {};
    if (title !== undefined) data.title = title;
    if (release_year !== undefined) data.release_year = release_year;
    if (description !== undefined) data.description = description;
    if (cover_url !== undefined) data.cover_url = cover_url;
    if (artist_id !== undefined) data.artist_id = artist_id;

    if (genreIds !== undefined) {
      data.albums_genres = {
        deleteMany: {},
        create: genreIds.map((genreId) => ({
          genres: { connect: { id: genreId } },
        })),
      };
    }

    const album = await prisma.albums.update({
      where: { id },
      data,
      include: {
        artists: true,
        albums_genres: { include: { genres: true } },
      },
    });
    res.json(formatAlbum(album));
  } catch (error) {
    next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.albums.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
