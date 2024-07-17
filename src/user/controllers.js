const User = require("./model");
const jwt = require("jsonwebtoken");

//add a user to the database
const registerUser = async (req, res) => {
  // console.log("req.body: ", req.body);
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

//Log a user in
const login = async (req, res) => {
  try {
    const token = await jwt.sign({ id: req.user.id }, process.env.SECRET);

    const user = {
      id: req.user.id,
      username: req.user.username,
      token: token,
    };

    res.status(201).json({ message: "success", user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

//get a single user by username
const getUserByUsername = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

//get all users
const getAllUsers = async (req, res) => {
  try {
    const user = await User.findAll();

    res.status(201).json({ message: "success", user: user });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

//delete user by username
const removeUser = async (req, res) => {
  const { username } = req.body;

  try {
    const deleted = await User.destroy({
      where: { username: username },
    });

    if (!deleted) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

//delete all users
const removeAllUsers = async (req, res) => {
  try {
    await User.destroy({
      where: {},
      truncate: true,
    });

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  registerUser: registerUser,
  login: login,
  getUserByUsername: getUserByUsername,
  getAllUsers: getAllUsers,
  removeUser: removeUser,
  removeAllUsers: removeAllUsers,
};
