const userRouter = require("express").Router();
const controller = require("../controllers/userController");
const libraryRoutes = require("./libraryRoutes");

userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getUserById);
userRouter.post("/", controller.createUser);

userRouter.use("/:userId/library", libraryRoutes);

module.exports = userRouter;
