require("dotenv").config;
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      const { id } = jwt.verify(bearerToken, process.env.JWT_KEY);
      if (id) {
        next();
      } else {
        return res
          .status(403)
          .json({ message: "Invalid token", isSuccess: false });
      }
    } else {
      return res.status(403).json({
        message: "This request is forbidden. Missing authorization header",
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSucces: false });
  }
};

module.exports = verifyToken;
