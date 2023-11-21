const express = require("express");
const {
  getAllProducts,
  createProduct,
  upDateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
router.route("/products").get(getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(upDateProduct).delete(deleteProduct);

module.exports = router;
