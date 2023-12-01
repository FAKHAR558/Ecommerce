const ErrorHandler = require("../Utils/errorHandler");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
const User = require("../Models/userModel");
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  // console.log("Should Run After");
  const token = user.getJWTTokens();
  res.status(201).json({
    success: true,
    token,
  });
};
///Login User Auth
exports.loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  ///check logic for both eneteries are done or not
  if (!email || !password) {
    return next(new ErrorHandler("Enter email Or Password ", 400));
  }
  const user = User.findOne({ email }).select("+password");

  if (!user) {
    return new ErrorHandler("Invalid Email or Password", 401);
  }

  const isPasswordMatched = user.checkPassword(password);
  if (!isPasswordMatched) {
    return new ErrorHandler("Invalid Email or Password", 401);
  }
  const token = user.getJWTTokens();
  res.status(200).json({
    success: true,
    token,
  });
});

exports.getAllUser = AsyncErrorHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    message: "List Of registerd users",
    user,
  });
});

exports.upDateUser = AsyncErrorHandler(async (req, res, next) => {
  console.log(req.params.id);
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Not Found ", 404));
  }
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    //runValidators:true
    // useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
});
exports.deleteUser = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User Not Found ", 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success: true,
    message: "User is deleted Successfully",
    user,
  });
});
