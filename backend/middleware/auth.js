const jwt = require("jsonwebtoken");
// this allows users to signup and create an account safely
module.exports = (req, res, next) => {
  try {
    const token = jwt.sign({ userId: req.body.userId }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
