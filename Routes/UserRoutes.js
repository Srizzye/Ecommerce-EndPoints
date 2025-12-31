const express = require("express");
const Router = express.Router();
const {
  addCart,
  showCart,
  placeOrder,
  removeCart,
} = require("../Controllers/user.js");

Router.post("/addCart/:product_id", addCart);
Router.delete("/removeCart/:product_id", removeCart);
Router.get("/showCart", showCart);
Router.get("/placeOrder", placeOrder);

module.exports = Router;
