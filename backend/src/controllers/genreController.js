const prisma = require("../config/prisma");

const getAllGenres = async (req, res, next) => {
  try {
    const genres = await prisma.genres.findMany();
    res.json(genres);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllGenres,
};
