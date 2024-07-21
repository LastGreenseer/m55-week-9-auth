const { Router } = require("express");
const userRouter = Router();

//these are the CRUD functions
const {
  registerUser,
  login,
  getUserByUsername,
  getAllUsers,
  removeUser,
  removeAllUsers,
  updateEmail,
} = require("./controllers");

//these provide added security
const { hashPass, comparePass, verifyToken } = require("../middleware/auth");

//routes
userRouter.post("/registerUser", hashPass, registerUser);

userRouter.post("/login", comparePass, login);

userRouter.get("/getUser/:username", getUserByUsername);

userRouter.get("/getAllUsers", verifyToken, getAllUsers);

userRouter.delete("/removeUser", removeUser);

userRouter.delete("/removeAllUsers", removeAllUsers);

userRouter.put("/updateEmail/:username", updateEmail);

module.exports = userRouter;
