const { Router } = require("express");
const userRouter = Router();

const { registerUser } = require("./controllers");
const { hashPass, comparePass } = require("../middleware/auth");

userRouter.post("/registerUser", hashPass, registerUser);

module.exports = userRouter;
