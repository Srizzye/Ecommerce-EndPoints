const express = require("express");
const {
  LoginController,
  CustomerRegisterController,
  SellerRegisterController,
  AuthenticateToken,
} = require("../Controllers/auth.js");

const Router = express.Router();

Router.post("/login", LoginController);
Router.post("/register/seller", SellerRegisterController);
Router.post("/register/customer", CustomerRegisterController);

module.exports = Router;
