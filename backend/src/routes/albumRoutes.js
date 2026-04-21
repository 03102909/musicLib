const albumRouter = require("express").Router();
const albumController = require("../controllers/albumController");
const { authenticateToken, requireRole } = require("../utils/middleware");

albumRouter.get("/", albumController.getAllAlbums);
albumRouter.get("/:id", albumController.getAlbumById);
albumRouter.post("/", authenticateToken, requireRole("admin"), albumController.createAlbum);
albumRouter.put("/:id", authenticateToken, requireRole("admin"), albumController.updateAlbum);
albumRouter.delete("/:id", authenticateToken, requireRole("admin"), albumController.deleteAlbum);

module.exports = albumRouter;
