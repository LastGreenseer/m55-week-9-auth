require("dotenv").config();


const express = require("express");

const User = require("./user/model")

const testRouter = require("./test/routes");
const userRouter = require("./user/routes");

const port = process.env.PORT || 5001;

const app = express();

const syncTables = () => {

    User.sync()
}

app.use(express.json ());

app.use("/test", testRouter);

app.use("/user", userRouter);

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
    syncTables();
  console.log(`Server is listening on port ${port}`);
});
