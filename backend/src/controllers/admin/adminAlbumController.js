const prisma = require("../../config/prisma");

const getAllAlbums = async (req, res) => {
  const albums = await prisma.albums.findMany({
    include: { artists: true },
  });
  res.render("admin/albums/index", { albums });
};

const createAlbum = async (req, res) => {
  const { title, release_year, description, cover_url, artist_id, genre_ids } =
    req.body;

  let genresData = [];

  if (genre_ids) {
    if (Array.isArray(genre_ids)) {
      genresData = genre_ids.map((id) => {
        return { genre_id: parseInt(id) };
      });
    } else {
      genresData = [{ genre_id: parseInt(genre_ids) }];
    }
  }

  await prisma.albums.create({
    data: {
      title,
      release_year: parseInt(release_year),
      description,
      cover_url,
      artist_id: parseInt(artist_id),
      albums_genres: {
        create: genresData,
      },
    },
  });

  res.redirect("/admin/albums");
};

const updateAlbum = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, release_year, description, cover_url, artist_id } = req.body;

  await prisma.albums.update({
    where: { id },
    data: {
      title,
      release_year: parseInt(release_year),
      description,
      cover_url,
      artist_id: parseInt(artist_id),
    },
  });

  res.redirect("/admin/albums");
};

const deleteAlbum = async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.albums_genres.deleteMany({
    where: { album_id: id },
  });

  await prisma.albums.delete({
    where: { id },
  });

  res.redirect("/admin/albums");
};

module.exports = {
  getAllAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
};
