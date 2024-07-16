const User = require("./model");
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
  // console.log("req.body: ", req.body);
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

const login = async (req, res) => {
  try {

    const token = await jwt.sign({}, "")

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
}

const getUserByUsername = async (req, res) =>{
  try {
    const user = await User.findOne ({ where: { username }})
    return user;
  }catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
  }

module.exports = {
  registerUser: registerUser,
  login: login
};
