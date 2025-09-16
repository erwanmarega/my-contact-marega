const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;