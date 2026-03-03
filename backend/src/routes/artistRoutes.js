const artistRouter = require("express").Router();
const artistController = require("../controllers/artistController");

artistRouter.get("/", artistController.getAllArtists);
artistRouter.post("/", artistController.createArtist);
artistRouter.put("/:id", artistController.updateArtist);
artistRouter.delete("/:id", artistController.deleteArtist);

module.exports = artistRouter;
