const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "very_long_secret_key_for_json_web_token");
    req.userData = { userId: decodedToken.userId, userRole: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "You Are Not Authenticated!" });
  }
}
