const { Router } = require("express");
const userRouter = Router();

const { addUser } = require("./controllers");

userRouter.post("/addUser", addUser);

module.exports = userRouter;
