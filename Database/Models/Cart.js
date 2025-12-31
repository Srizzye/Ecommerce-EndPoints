const Mongoose = require("mongoose");

const CartSchema = Mongoose.Schema({
  User_id: Mongoose.Types.ObjectId,
  Products: [Mongoose.Types.ObjectId],
});

const Cart = Mongoose.model("Cart", CartSchema);

module.exports = Cart;
