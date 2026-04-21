const authRouter = require("express").Router();
const controller = require("../controllers/authController");
const { authenticateToken } = require("../utils/middleware");

authRouter.post("/register", controller.register);
authRouter.post("/login", controller.login);
authRouter.get("/me", authenticateToken, controller.me);

module.exports = authRouter;
