const mongoose = require("mongoose");

const Employee = mongoose.Schema(
  {
    emp_id:{
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    doj: {
      type: String,
      required: true,
    },
    rep: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    idproof: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("employee", Employee);