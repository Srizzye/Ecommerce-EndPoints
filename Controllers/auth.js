const jwt = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");
const Users = require("../Database/Models/Users.js");

const LoginController = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Users.findOne({ email: email });
    if (!user || user == null) {
      res.send("User Not Found");
    }
    if (compare(user.password, password)) {
      const access_token = await generate_access_token(
        req.body.name,
        email,
        password
      );
      res.cookie("access_token", access_token, {
        httpOnly: true,
      });
      res.send(`Logged In Successfully , access = ${access_token}`);
    }
  } catch (error) {
    res.send(`Error In Login ${error}`);
  }
};

const generate_access_token = async (name, email, password) => {
  try {
    const token = await jwt.sign(
      { name, email, password },
      process.env.ACCESS_KEY
    );
    console.log("Access Token Generated");
    return token;
  } catch (error) {
    console.log("Error in access token generation");
  }
};

const RegisterController = async (req, res) => {
  console.log("Register HIT");
  const email = req.body.email;
  const user = await Users.findOne({ email: email });
  if (user) return res.send("User Email Already Exists");
  try {
    const password = req.body.password;
    const hashpass = await hash(password, 12);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashpass,
    };
    const result = await Users.create(user);
    res.send("Registered Successfully");
  } catch (error) {
    console.log("Error In Register:", error);
    res.send(`Error ${error}`);
  }
};

const AuthenticateToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const token = headers.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);
    if (decoded.email === "Admin@gmail.com") {
      req.isAdmin = true;
      console.log("You Are A Admin");
    }
    const user = await Users.findOne({ email: decoded.email });
    req.userId = user._id;
    req.userMail = decoded.email;
    console.log("Token Verified");
    next();
  } catch (error) {
    res.send(`Error In Auth ${error}`);
  }
};

module.exports = { LoginController, RegisterController, AuthenticateToken };
