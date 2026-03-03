const prisma = require("../config/prisma");

const getAllArtists = async (req, res, next) => {
  try {
    const artists = await prisma.artists.findMany();
    res.json(artists);
  } catch (error) {
    next(error);
  }
};

const createArtist = async (req, res, next) => {
  try {
    const { name } = req.body;

    const artist = await prisma.artists.create({
      data: { name },
    });

    res.status(201).json(artist);
  } catch (error) {
    next(error);
  }
};

const updateArtist = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const artist = await prisma.artists.update({
      where: { id },
      data: { name },
    });

    res.json(artist);
  } catch (error) {
    next(error);
  }
};

const deleteArtist = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await prisma.artists.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
};
