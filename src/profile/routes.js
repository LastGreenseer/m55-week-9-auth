const { Router } = require("express");
const profileRouter = Router();

const { addProfile } = require("./controllers");

profileRouter.post("/addProfile", addProfile);

module.exports = profileRouter;
