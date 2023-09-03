const jwt = require("jsonwebtoken");

// Middleware for user authentication using JSON Web Tokens (JWT)
module.exports = (req, res, next) => {
  try {
    // Sign a new JWT token with the user's ID and a secret key ("RANDOM_TOKEN_SECRET")
    const token = jwt.sign({ userId: req.body.userId }, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h", // Token will expire in 24 hours
    });

    // Verify and decode the token to extract the user's ID
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET", {
      expiresIn: "24h",
    });

    // Extract the user ID from the decoded token and add it to the request object
    const userId = decodedToken.userId;
    req.auth = { userId };

    // Check if the user ID from the request body matches the decoded user ID
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      // If the user ID matches, proceed to the next middleware or route handler
      next();
    }
  } catch {
    // Handle any errors related to token verification or invalid requests
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
