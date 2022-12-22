const JWT = require("jsonwebtoken");
require("dotenv").config();
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("You need to provide an email and a password");
  }
  const fakeID = new Date().getDate();
  const payload = { fakeID, username };
  const token = JWT.sign({ payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: `Token created`, token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret_key: `Your key is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
