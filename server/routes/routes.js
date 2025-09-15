const express = require("express");

const Login = require("../login"); 
const CreateUser = require("../signup");

const router = express.Router();

router.post("/signup", CreateUser);
router.post("/login", Login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;