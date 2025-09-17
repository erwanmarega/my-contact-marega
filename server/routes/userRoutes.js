// Pas terminé la page la route user, à finir plus tard (à ne pas prendre en compte)

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/middlewareLogin");
const { getMe } = require("../controllers/userController");

router.get("/me", authMiddleware, getMe);

module.exports = router;
