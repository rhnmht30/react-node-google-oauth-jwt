const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("HomaPage");
});

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearerToken = bearerHeader.split(" ")[1];
    // Set the token
    req.token = bearerToken;
  }
  // Next middleware
  next();
};

app.get("/protected", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.send("Forbidden");
    } else {
      res.json({
        message: "protected",
        user: authData
      });
    }
  });
});

app.post("/getToken", (req, res) => {
  const user = req.body;
  jwt.sign(user, "secretkey", (err, token) => {
    res.json({
      message: "recv",
      token
    });
  });
});

const PORT = 4500;

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
