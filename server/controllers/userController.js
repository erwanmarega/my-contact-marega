const User = require("../models/user");

const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Utilisateur non authentifié" });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (err) {
    console.error("Erreur getMe:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = { getMe };
