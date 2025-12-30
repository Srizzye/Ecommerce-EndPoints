const Product = require("../Database/Models/Products");

const addProduct = async (req, res) => {
  try {
    if (!req.isAdmin) return res.send("No Access");
    await Product.create(req.body);
    res.send("Product Added");
  } catch (error) {
    res.send(`Error In Adding: ${error}`);
  }
};
const deleteProduct = async (req, res) => {
  try {
    if (!req.isAdmin) return res.send("No Access");
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
  } catch (error) {
    res.send(`Error In Deleting: ${error}`);
  }
};
const updateProduct = async (req, res) => {
  try {
    if (!req.isAdmin) return res.send("No Access");
    const { id } = req.params;
    await Product.updateOne({ _id: id }, req.body);
  } catch (error) {
    res.send(`Error In Updating: ${error}`);
  }
};

module.exports = { addProduct, deleteProduct, updateProduct };
