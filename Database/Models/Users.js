const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  cartId: mongoose.Types.ObjectId,
});

const Users = mongoose.model("User", UserSchema);
module.exports = Users;
