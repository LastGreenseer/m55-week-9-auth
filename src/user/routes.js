const { Router } = require("express");
const userRouter = Router();

//these are the CRUD functions
const { registerUser, login, getUserByUsername } = require("./controllers");
//these provide added security
const { hashPass, comparePass } = require("../middleware/auth");

userRouter.post("/registerUser", hashPass, registerUser);
userRouter.post("/login", comparePass, login);
userRouter.get("/getUser/:username", getUserByUsername);

module.exports = userRouter;
