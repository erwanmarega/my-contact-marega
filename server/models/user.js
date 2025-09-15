const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false, minlength: 10, maxlength: 20 },
  createdAt: { type: Date, default: Date.now },
  

});

module.exports = mongoose.model("User", userSchema);
