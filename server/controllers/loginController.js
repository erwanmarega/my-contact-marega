const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../services/generateToken"); 

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont obligatoires" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    return res.json({ token });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
