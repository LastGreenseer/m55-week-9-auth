const { Router } = require("express");
const userRouter = Router();

const { registerUser } = require("./controllers");

userRouter.post("/registerUser", registerUser);

module.exports = userRouter;
