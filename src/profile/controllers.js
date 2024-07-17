const Profile = require("./model");
const User = require("../user/model");

// this needs to be refactored so a user can create a profile, and that they will have a token giving them access to it
const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json({ message: "success", profile: profile });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
    createProfile,
}
