const ProductModel = require("./Database/Models/Products");
const subcategory = require("./Database/Models/Subcategory");
const category = require("./Database/Models/Category.js");

const addProducts = async (req, res) => {
  await category.create({ name: "laptop " });
};

module.exports = addProducts;
