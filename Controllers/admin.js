const category = require("../Database/Models/Category");
const Product = require("../Database/Models/Products");
const subcategory = require("../Database/Models/Subcategory");
const { subscribe } = require("../Routes/AuthRoutes");

const addProduct = async (req, res) => {
  try {
    if (!req.isSeller && !req.isAdmin) {
      return res.status(403).send("No Access");
    }

    const productData = {
      name: req.body.name,
      sellerId: req.userId,
      price: req.body.price,
      category: req.body.category,
      subcategory: req.body.subcategory,
      release: req.body.release,
      brand: req.body.brand,
      Specification: req.body.Specification,
    };

    const newProduct = await Product.create(productData);

    const newSubcategory = await subcategory.findOne({
      name: req.body.subcategory,
    });

    if (!newSubcategory) {
      return res
        .status(404)
        .send(`Subcategory '${req.body.subcategory}' not found`);
    }

    newSubcategory.products.push(newProduct._id);
    await newSubcategory.save();

    const newCategory = await category.updateOne(
      { name: req.body.category },
      { $addToSet: { subcategory: newSubcategory._id } }
    );
    return res.send("Product Added");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error In Adding: ${error}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.isSeller) {
      const deleteProduct = await Product.findOneAndDelete({
        _id: id,
        sellerId: req.userId,
      });
      if (!deleteProduct) {
        return res.send("No Access For This Product");
      }
      return res.send("Product Deleted");
    }
    if (!req.isAdmin) return res.send("No Access");
    await Product.findByIdAndDelete(id);
    res.send("Product Deleted");
  } catch (error) {
    res.send(`Error In Deleting: ${error}`);
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.isSeller) {
      const updateProduct = await Product.findOneAndUpdate(
        {
          _id: id,
          sellerId: req.userId,
        },
        req.body
      );
      if (!updateProduct) {
        return res.send("No Access For This Product");
      }
      return res.send("Product Updated");
    }
    if (!req.isAdmin) return res.send("No Access");
    await Product.updateOne({ _id: id }, req.body);
    res.send("Product Updated");
  } catch (error) {
    res.send(`Error In Updating: ${error}`);
  }
};

module.exports = { addProduct, deleteProduct, updateProduct };
