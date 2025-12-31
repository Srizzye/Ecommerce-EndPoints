const express = require("express");
const Router = express.Router();
const getHome = require("../Controllers/home.js");
const {
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/admin.js");

Router.get("/", getHome);
Router.post("/add", addProduct);
Router.post("/update/:id", updateProduct);
Router.delete("/delete/:id", deleteProduct);
module.exports = Router;
