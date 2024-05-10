const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profimgurl: {
    type: String,
    require: true,
  },

  isAdmin: { type: Boolean, default: false },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
