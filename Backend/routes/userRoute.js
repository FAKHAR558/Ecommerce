const express = require("express");
const {
  getAllUser,
  createUser,
  upDateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/users").get(getAllUser);
router.route("/user/:id").put(upDateUser).delete(deleteUser);

module.exports = router;
