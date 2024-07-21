const { Router } = require("express");
const profileRouter = Router();

const { verifyToken} = require("../middleware/auth")
const { createProfile } = require("./controllers");

profileRouter.post("/addProfile", verifyToken, createProfile);

module.exports = profileRouter;
