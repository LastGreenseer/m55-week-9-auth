const { Router } = require("express");
const userRouter = Router();

const { registerUser, login, getUserByUsername } = require("./controllers");
const { hashPass, comparePass } = require("../middleware/auth");

userRouter.post("/registerUser", hashPass, registerUser);
userRouter.post("/login", comparePass, login);
userRouter.get("/getUser/:username", getUserByUsername);

module.exports = userRouter;
