const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: false, minlength: 10, maxlength: 20 },
    email: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 

  });
  
module.exports = mongoose.model("Contact", ContactSchema);  