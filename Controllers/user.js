const Product = require("../Database/Models/Products");
const Users = require("../Database/Models/Users");
const Cart = require("../Database/Models/Cart.js");
const Mongoose = require("mongoose");

const addCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    console.log(req.userId);
    const User = await Users.findById(req.userId);
    let User_Cart = await Cart.updateOne(
      { User_id: req.userId },
      {
        $push: { Products: product_id },
      }
    );
    if (User_Cart == null) {
      User_Cart = await Cart.create({
        User_id: req.userId,
      });
      User_Cart.User_id = req.userId;
      User.cartId = User_Cart._id;
      User.save();
      User_Cart[0].Products.push(product_id);
      User_Cart.save();
      return res.send("New Cart Added");
    }
    console.log(User_Cart);
    res.send("Items Added To Cart");
  } catch (error) {
    res.send(`Error In Adding Cart : ${error}`);
  }
};

const removeCart = async (req, res) => {
  try {
    const { product_id } = req.params;
    await Cart.updateOne(
      { User_id: req.userId },
      {
        $pull: { Products: product_id },
      }
    );
    res.send("Item Removed");
  } catch (error) {
    res.send(`Error In Removing cart : ${error}`);
  }
};

const showCart = async (req, res) => {
  try {
    console.log(req.userId);
    const items = await Cart.aggregate([
      {
        $match: { User_id: new Mongoose.Types.ObjectId(req.userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "Products",
          foreignField: "_id",
          as: "cartItems",
        },
      },
    ]);
    // console.log(items);
    res.send(items[0].cartItems);
  } catch (error) {
    res.send(`Error In Show Cart ${error}`);
  }
};

const placeOrder = async (req, res) => {
  try {
    let summaryOfProducts = [];
    let sum = 0;
    const items = await Cart.aggregate([
      {
        $match: { User_id: new Mongoose.Types.ObjectId(req.userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "Products",
          foreignField: "_id",
          as: "cartItems",
        },
      },
    ]);
    for (let item of items[0].cartItems) {
      summaryOfProducts.push(
        `  name: ${item.name},      
        category: ${item.category},        
        price: ${item.price} \n`
      );
      sum += item.price;
    }
    res.send(summaryOfProducts + "\n" + `TOTAL : ${sum}`);
  } catch (error) {
    res.send(`Error In Placing Order ${error}`);
  }
};

module.exports = { addCart, showCart, placeOrder, removeCart };
