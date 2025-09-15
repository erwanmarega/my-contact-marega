
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: "Non authentifié" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = { _id: decoded.id };
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalide" });
  }
};

module.exports = authMiddleware;
