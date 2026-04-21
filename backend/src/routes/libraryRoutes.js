const libraryRouter = require("express").Router();
const controller = require("../controllers/libraryController");
const { authenticateToken, requireRole } = require("../utils/middleware");

libraryRouter.use(authenticateToken, requireRole("user"));

libraryRouter.get("/", controller.getUserLibrary);
libraryRouter.post("/", controller.addToLibrary);
libraryRouter.put("/:id", controller.updateLibraryItem);
libraryRouter.delete("/:id", controller.deleteLibraryItem);

module.exports = libraryRouter;
