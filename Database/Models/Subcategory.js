const { default: mongoose } = require("mongoose");

const subcategorySchema = mongoose.Schema({
  name: String,
  products: [mongoose.Types.ObjectId],
});

const subcategory = mongoose.model("e-subcategory", subcategorySchema);

module.exports = subcategory;
