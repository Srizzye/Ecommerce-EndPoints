const {
  getAllProducts,
  getSubcategories,
  getcategories,
  addcomments,
  showcommentsforid,
  showallcomments,
  addreviews,
  addlike,
  adddislike,
  filterSub,
} = require("../Controllers/product");
const express = require("express");
const Router = express.Router();

Router.get("/all", getAllProducts);
Router.get("/sub/:sub_id", getSubcategories);
Router.get("/cat/:cat_id", getcategories);
Router.post("/addcomment/:parent_id", addcomments);
Router.get("/showcomment/:parent_id", showcommentsforid);
Router.get("/showallcomments/:parent_id", showallcomments);
Router.post("/addreviews/:parent_id", addreviews);
Router.post("/addlikes/:parent_id", addlike);
Router.post("/adddislikes/:parent_id", adddislike);
Router.get("/filter/:sub_id/:brand/:ltprice/:gtprice", filterSub);

module.exports = Router;
