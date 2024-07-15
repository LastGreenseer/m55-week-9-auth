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
const isLowerCase = async (req, res, next) => {
  try {
    req.body.username = req.body.username.toLowerCase();
//     let string = req.body.username;

//     if (string !== string.toLowerCase()) {
//       string = string.toLowerCase();
//     }

//     req.body.username = string;

    next()
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

// checks if email is valid using regex
const isValidEmail = async (req, res, next) => {
    try {

        const checkEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;
 

        if(checkEmail.test(req.body.email)) {
            res.status(422).json({message: "email not valid"})
        }

        next ()
    } catch (error){
        res.status(500).json({ message: error.message, error: error });
    }
};

module.exports = {
  isData,
  isLowerCase,
};
