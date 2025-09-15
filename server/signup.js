const User = require("./models/user");

const { createSecretToken } = require("./generateToken");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res) => {
    try {   
        if (
            !req.body.email ||
            !req.body.password ||
            !req.body.confirmPassword ||
            !req.body.phone

        ) {
            return res
                .status(400)
                .json({ message: "Tous les champs sont obligatoires" });
        }

        const OldUser = await User.findOne({ email: req.body.email });

        if (OldUser) {
            return res
                .status(400)
                .json({ message: "Un compte avec cet email existe déjà" });
        }
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const NewUser = await User.create({
            email: req.body.email,
            password: hashedPassword,
        });
        const user = await NewUser.save();
        const token = createSecretToken(user._id);

    
        res.cookie("token", token, {
            path: "/", 
            expires: new Date(Date.now() + 86400000), 
            secure: true, 
            httpOnly: true, 
            sameSite: "None",
          });
      
          console.log("cookie set succesfully");
      
          res.json(user);
        } catch (error) {
          console.log("Gott an error", error);
        }
      };
      module.exports = CreateUser;