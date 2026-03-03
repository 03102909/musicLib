const genreRouter = require("express").Router();
const genreController = require("../controllers/genreController");

genreRouter.get("/", genreController.getAllGenres);

module.exports = genreRouter;
