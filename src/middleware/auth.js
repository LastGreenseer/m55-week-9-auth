const bcrypt = require("bcrypt");
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

const comparePass = (req, res, next) => {
  const { username, password } = req.body;

  //bcrypt.compare takes 2 parameters, the plaintext password and the hashed password from the db

  // get user from db with username
  // check if user exists
  // compare password
  //check is return value is true or false
  // if false response "passwords do not match"
  // attach user to the request
  //next
  try {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (!password) {
        return res.status(400).json({ message: "Password does not match" });
      }
    });
  } catch (error) {
    res.status(500).json()({ message: error.message, error });
  }
};

module.exports = {
  hashPass,
  comparePass,
};
