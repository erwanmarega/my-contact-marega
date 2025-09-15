const User = require("./models/user");
const bcrypt = require("bcrypt");


const env = require("dotenv");
const { createSecretToken } = require("./generateToken");
env.config();

const Login    = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Tous les champs sont obligatoires" });
    }
    const user = await User.findOne({ email });
    if (!user && (await bcrypt.compare(password, User.password))) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }
    const token = createSecretToken(user._id);
  res.cookie("token", token, {
    path: "/", 
    expires: new Date(Date.now() + 86400000), 
    secure: true, 
    httpOnly: true,
    sameSite: "None",
  });

  res.json({ token });
};
module.exports = Login;