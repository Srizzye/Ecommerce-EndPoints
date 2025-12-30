const { default: mongoose } = require("mongoose");
const subcategory = require("./Subcategory");

const categorySchema = mongoose.Schema({
  name: String,
  subcategory: [mongoose.Types.ObjectId],
});

const category = mongoose.model("e-category", categorySchema);

module.exports = category;
