const User = require("./model");

const registerUser = async (req, res) => {
  // console.log("req.body: ", req.body);
  try {
    const user = await User.create(req.body);

    res.status(201).json({ message: "success", user: username });
  } catch (error) {
    res.status(501).json({ message: error.message, error: error });
  }
};

module.exports = {
  registerUser: registerUser,
};
