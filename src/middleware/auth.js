const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require("../user/model");
// const saltRounds = +process.env.SALT_ROUNDS;

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const hashPass = async (req, res, next) => {
  try {
    console.log("plaintextpassword before hash: ", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log("hashedpassword: ", hashedPassword);

    req.body.password = hashedPassword;

    next();
  } catch (error) {
    res.status(500).json()({ message: error.message, error });
  }
};

// //   get user from db with username
// //   check if user exists
// //   compare password
// //   check is return value is true or false
// //   if false response "passwords do not match"
// //   attach user to the request
// //   next

const comparePass = async (req, res, next) => {
  try {
    // get user from database
    const user = await User.findOne({ where: { username: req.body.username } });

    //check if user exists
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // compare the passwords returning aa fail if false
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // attach user to request
    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

const verifyToken = async (req, res, next) => {
  
  try {
    const token = req.header("Authorization")
    console.log (token)
    next()
  } catch (error) {
  res.status(500).json({ message: error.message, error });  
  }

}

module.exports = {
  hashPass,
  comparePass,
  verifyToken,
};
