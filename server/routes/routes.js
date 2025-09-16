const express = require("express");

const loginController = require("../controller/loginController"); 
const signupController = require("../controller/signupController");

const router = express.Router();

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;