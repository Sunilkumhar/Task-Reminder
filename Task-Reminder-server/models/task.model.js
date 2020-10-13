const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  { 
    name: {
      type: String,
      required: [true, "Name required"],
      trim: true,
    },
    currDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, "Duedate required"],
      trim: true,
    },
    about: {
      type: String,
      required: [true, "About required"],
      trim: true,
    },
  }
);

const Addtask = mongoose.model("Addtask", taskSchema);

module.exports = Addtask;
