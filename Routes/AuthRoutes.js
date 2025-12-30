const express = require("express");
const {
  LoginController,
  RegisterController,
  AuthenticateToken,
} = require("../Controllers/auth.js");

const Router = express.Router();

Router.post("/login", LoginController);
Router.post("/register", RegisterController);

module.exports = Router;
