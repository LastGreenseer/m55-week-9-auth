const isData = async (req, res, next) => {
  console.log("isData middleware hit and username:", req.body.username);
  try {
    if (!req.body.username) {
      res.status(422).json({ message: "data is incomplete" });
      return;
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// checks if string is lowercase and makes lower
const isLoverCase = async (req, res, next) => {
    try{
        // code here
    }catch (error) {
        res.status(500).json({ message: error.message, error: error });
    }

}

// checks if email is valid using regex
const isValidEmail = async (req, res, next) => {

}

module.exports = {
  isData,
};
