const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../services/generateToken"); 

exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword, phone } = req.body;

    if (!email || !password || !confirmPassword || !phone) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Un compte avec cet email existe déjà" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      phone,
      password: hashedPassword,
    });

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur signup:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
