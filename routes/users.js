var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../util/check-auth");

const User = require("../models/User");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../util/validators");

const generateToken = (user) => {
  console.log(user);
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
};

router.get("/", function (req, res, next) {
  res.send("user");
});

router.get("/getUser", async function (req, res, next) {
  let headers = req.headers;
  try {
    const user = checkAuth(headers);
    if (user) {
      res.send(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

router.post("/login", async function (req, res, next) {
  let { email, password } = req.body;

  try {
    const { valid, errors } = validateLoginInput(email, password);
    if (!valid) {
      res.send({ errors });
      throw new Error("Invalid");
    }

    const user = await User.findOne({ email });
    if (user) {
      const token = generateToken(user);
      res.send({ ...user._doc, id: user._id, token });
    } else {
      res.send({ errors: { user: "User does't Exist" } });
      throw new Error("User doesn't Exist");
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/register", async function (req, res, next) {
  let { name, email, password, confirmPassword } = req.body;

  try {
    const { valid, errors } = validateRegisterInput(
      email,
      password,
      confirmPassword
    );

    if (!valid) {
      res.send({ errors });
      throw new Error("Invalid");
    }

    const user = await User.findOne({ email });
    if (user) {
      res.send({ errors: { username: "This username is already taken" } });
      throw new Error("This username is already taken");
    }

    password = await bcrypt.hash(password, 12);
    console.log(password);

    const newUser = new User({
      name,
      email,
      password,
    });

    const result = await newUser.save();

    const token = generateToken(result);

    if (result) {
      res.send({ ...result._doc, id: result._id, token });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
