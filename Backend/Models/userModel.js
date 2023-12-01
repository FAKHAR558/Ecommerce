const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchma = new mongoose.Schema({
  name: {
    type: String,
    maxLength: [15, "Name Can't Exceed 15 Chracters"],
    minLength: [4, "Name can't be less than 4 Chracters"],
    required: [true, "Name Can't be Empty"],
  },
  email: {
    type: String,
    required: [true, "Enter Your Email"],
    validate: [validator.isEmail, "Enter Valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter Your Password"],
    minLength: [6, "Password should be greater than 8 chracter"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchma.pre("save", async function (next) {
  // console.log("should run  before");
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//Compare Password Start
userSchma.methods.checkPassword = function (enteredPassword) {
  // return bcrypt.compare(enteredPassword, this.password);
  console.log("Compare Password Is Here");
};
//Compare Password End
// JWT Start
userSchma.methods.getJWTTokens = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_Expire,
  });
};
// JWT End

module.exports = mongoose.model("User", userSchma);
