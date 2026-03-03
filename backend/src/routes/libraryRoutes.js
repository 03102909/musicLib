const libraryRouter = require("express").Router({ mergeParams: true });
const controller = require("../controllers/libraryController");

libraryRouter.get("/", controller.getUserLibrary);
libraryRouter.post("/", controller.addToLibrary);
libraryRouter.put("/:id", controller.updateLibraryItem);
libraryRouter.delete("/:id", controller.deleteLibraryItem);

module.exports = libraryRouter;
