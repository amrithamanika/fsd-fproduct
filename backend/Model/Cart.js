const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },     
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, 
  quantity: { type: Number, default: 1 } 
});

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;