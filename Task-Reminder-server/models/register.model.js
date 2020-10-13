const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Addtask = require("./task.model");
require("dotenv").config();
const regexForEmailValidation = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const Schema = mongoose.Schema;

const registerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Email required"],
      trim: true,
      index: { unique: true },
      // match: regexForEmailValidation,
    },
    pass: {
      type: String,
      required: [true, "Password required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone required"],
    },
    tasks: ["Addtask"],
  },
  {
    timestamps: true,
  }
);

registerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.task_jwtprivate
  );
  return token;
};
const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
