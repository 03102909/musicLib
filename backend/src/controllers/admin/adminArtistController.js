const prisma = require("../../config/prisma");

const getAllArtists = async (req, res) => {
  const artists = await prisma.artists.findMany();
  res.render("admin/artists/index", { artists });
};

const createArtist = async (req, res) => {
  const { name } = req.body;
  await prisma.artists.create({
    data: { name },
  });
  res.redirect("/admin/artists");
};

const updateArtist = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  await prisma.artists.update({
    where: { id },
    data: { name },
  });
  res.redirect("/admin/artists");
};

const deleteArtist = async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.artists.delete({
    where: { id },
  });
  res.redirect("/admin/artists");
};

module.exports = { getAllArtists, createArtist, updateArtist, deleteArtist };
