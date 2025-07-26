const mongoose = require('mongoose');

const uschema = mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
  Phone: Number,
  userType: { type: String, enum: ["admin", "user"], default: "user" }
});

const userModel = mongoose.model("User", uschema);
module.exports = userModel;