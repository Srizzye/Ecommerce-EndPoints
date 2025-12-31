const { default: mongoose } = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  subcategory: String,
  release: String,
  brand: String,
  ratings: {
    type: Number, 
    default: 0,
  },
  Specification: [Object],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
