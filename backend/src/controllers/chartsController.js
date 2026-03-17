const prisma = require("../config/prisma");

const getAlbumsCountByYear = async (req, res, next) => {
  try {
    const grouped = await prisma.albums.groupBy({
      by: ["release_year"],
      _count: {
        id: true,
      },
      orderBy: {
        release_year: "asc",
      },
    });

    const result = grouped.map((item) => ({
      year: item.release_year.toString(),
      count: item._count.id,
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getAlbumsCountByGenre = async (req, res, next) => {
  try {
    const albumsGenres = await prisma.albums_genres.findMany({
      include: {
        genres: true,
      },
    });

    const genreCounts = {};
    for (const ag of albumsGenres) {
      if (ag.genres && ag.genres.name) {
        genreCounts[ag.genres.name] = (genreCounts[ag.genres.name] || 0) + 1;
      }
    }

    const result = Object.entries(genreCounts).map(([genre, count]) => ({
      genre,
      count,
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAlbumsCountByYear,
  getAlbumsCountByGenre,
};
