const Profile = require("./model");
const User = require("../user/model");
const jwt = require("jsonwebtoken");

// // this needs to be refactored so a user can create a profile, and that they will have a token giving them access to it
// const createProfile = async (req, res) => {
//   try {
//     //verify the token
//     //.split will break the 'Authorization' header string into an array allowing the token to be extracted
//     const token = req.headers.authorization?.split(" ")[1]; // index 0 in the array will be "Bearer" and index 1 will be the actual token
//     const decoded = jwt.verify(token, process.env.SECRET);

//     //extract userId from decoded token
//     const userId = decoded.id;

//     const profile = await Profile.create({ userId, ...req.body});

//     res.status(201).json({ message: "success", profile: profile });
//   } catch (error) {
//     res.status(500).json({ message: error.message, error: error });
//   }
// };

const createProfile = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const profile = await Profile.create({
      userId: userId,
      ...req.body,
    });

    const token = jwt.sign({ id: userId }, process.env.SECRET);

    res.status(201).json({ message: "Profile created", profile, token });
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  createProfile,
};
