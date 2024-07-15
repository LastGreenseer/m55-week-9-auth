const postTest = async (req, res) => {
  console.log("postTest controller hit and username: ", req.body.username);
  try {
    // db code

    res.status(201).json({ message: "success", body: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

module.exports = {
  postTest,
};
