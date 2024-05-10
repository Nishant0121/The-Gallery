const mongoose = require("mongoose");
import { boolean } from "@storybook/addon-knobs";
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
