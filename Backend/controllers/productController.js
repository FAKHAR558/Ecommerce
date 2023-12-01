const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const ApiFeatures = require("../Utils/apifeatures");
const AsyncErrorHandler = require("../Middleware/catchAsyncError");
//Post APi
exports.createProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get Api
exports.getAllProducts = AsyncErrorHandler(async (req, res) => {
  const resultperpage = 5;
  const productCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  const product = await apiFeatures.query;
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

//Put API
exports.upDateProduct = AsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found ", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    //runValidators:true
    // useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Api
exports.deleteProduct = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found ", 404));
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product is deleted Successfully",
    product,
  });
});
