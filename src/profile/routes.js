const { Router } = require("express");
const profileRouter = Router();

const { createProfile } = require("./controllers");

profileRouter.post("/addProfile", createProfile);

module.exports = profileRouter;
