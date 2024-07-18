const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

const SECRET_KEY = process.env.SECRET;
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

    // compare the passwords returning a fail if false
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
    //retrieve authorization information from "Authorization" header
    const token = req.header("Authorization");
    console.log(token);

    //if the token is not found, the user is trying to access a protected route without authorization
    if (!token) {
      return res.status(403).json({ message: "Unauthorized access!" });
    }

    //otherwise we use .verify from JWT library to check the token's validity
    //if valid, 'decoded' will contain the decoded payload, including the ID
    const decoded = jwt.verify(token, SECRET_KEY);

    //check the payload for the 'Id' field
    if (!decoded.id) {
      return res.status(403).json({ message: "Invalid user data" });
    }

    //if all is in order, the decoded user information is attached to the 'req' object
    req.user = decoded;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error });
  }
};

module.exports = {
  hashPass,
  comparePass,
  verifyToken,
};
