const bcrypt = require("bcrypt");
// const saltRounds = +process.env.SALT_ROUNDS;

const saltRounds = parseInt(process.env.SALT_ROUNDS)

const hashPass = async (req, res, next) => {
  try {
    console.log("plaintextpassword before hash: ", req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log("hashedpassword: ", hashedPassword )

    req.body.password = hashedPassword;
    
    next ()
  } catch (error) {
    res.status(500).json()({ message: error.message, error });
  }
};

module.exports = {
  hashPass,
};
