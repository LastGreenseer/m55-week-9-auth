const Profile = require("./model");
const User = require("../user/model");

const addProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json({ message: "success", profile: profile });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
    addProfile,
}
