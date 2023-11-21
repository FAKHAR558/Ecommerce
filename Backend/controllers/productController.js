const Product = require("../Models/productModel");

//Post APi
exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

//Get Api
exports.getAllProducts = async (req, res) => {
  const product = await Product.find();
  res.status(200).json({
    success: true,
    product,
  });
};

//Put API
exports.upDateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product is Nt=ot Found",
    });
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
};

//Delete Api
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product selected for Deletion is Not Found",
    });
  }
  await product.deleteOne();
  res.status(200).json({
    success: true,
    message: "Product is deleted Successfully",
    product,
  });
};
