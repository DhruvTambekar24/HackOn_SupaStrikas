const { requireAuth } = require("@clerk/express");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    requireAuth()(req, res, () => {
      if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ error: "Unauthorized: No user ID found" });
      }
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authMiddleware;
