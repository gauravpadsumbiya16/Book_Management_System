const express = require("express");

const { getAllUser, registerUser, loginUser ,invalidRouteHandle, logoutUser } = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/AllUsers").get(getAllUser);
router.route("*").get(invalidRouteHandle);

module.exports = router;