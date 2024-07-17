const { Router } = require("express");
const userRouter = Router();

//these are the CRUD functions
const {
  registerUser,
  login,
  getUserByUsername,
  getAllUsers,
} = require("./controllers");

//these provide added security
const { hashPass, comparePass } = require("../middleware/auth");

//routes
userRouter.post("/registerUser", hashPass, registerUser);

userRouter.post("/login", comparePass, login);

userRouter.get("/getUser/:username", getUserByUsername);

userRouter.get("/getAllUsers", getAllUsers);

module.exports = userRouter;
