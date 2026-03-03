const albumRouter = require("express").Router();
const albumController = require("../controllers/albumController");

albumRouter.get("/", albumController.getAllAlbums);
albumRouter.get("/:id", albumController.getAlbumById);
albumRouter.post("/", albumController.createAlbum);
albumRouter.put("/:id", albumController.updateAlbum);
albumRouter.delete("/:id", albumController.deleteAlbum);

module.exports = albumRouter;
