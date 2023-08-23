const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  user: {
    required: true,
    type: String,
    maxlength: 30,
  },
  password: {
    required: true,
    type: String,
    maxlength: 80,
  }
})

module.exports = mongoose.model("user", User);