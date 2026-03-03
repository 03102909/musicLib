const express = require("express");
const adminRouter = express.Router();

const adminAlbumController = require("../controllers/admin/adminAlbumController");
const adminArtistController = require("../controllers/admin/adminArtistController");

adminRouter.get("/albums", adminAlbumController.getAllAlbums);

adminRouter.post("/albums/create", adminAlbumController.createAlbum);

adminRouter.post("/albums/edit/:id", adminAlbumController.updateAlbum);

adminRouter.post("/albums/delete/:id", adminAlbumController.deleteAlbum);

// artists

adminRouter.get("/artists", adminArtistController.getAllArtists);

adminRouter.post("/artists/create", adminArtistController.createArtist);

adminRouter.post("/artists/edit/:id", adminArtistController.updateArtist);

adminRouter.post("/artists/delete/:id", adminArtistController.deleteArtist);

module.exports = adminRouter;
