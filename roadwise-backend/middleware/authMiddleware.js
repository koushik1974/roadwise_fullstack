const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("TOKEN:", token); // 🔴 DEBUG

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded); // 🔴 DEBUG

    req.user = { id: decoded.userId };

    console.log("REQ.USER SET TO:", req.user); // 🔴 DEBUG

    next();
  } catch (err) {
    console.error("JWT ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};
