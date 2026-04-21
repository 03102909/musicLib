const userRouter = require("express").Router();
const controller = require("../controllers/userController");

userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getUserById);
userRouter.post("/", controller.createUser);

module.exports = userRouter;
