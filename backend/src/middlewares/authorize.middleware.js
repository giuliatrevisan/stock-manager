export const authorize = (...roles) => {
    return (req, res, next) => {
      try {
        const user = req.user;
  
        if (!user) {
          return res.status(401).json({ message: "Unauthorized" });
        }
  
        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: "Forbidden" });
        }
  
        return next();
      } catch (error) {
        return res.status(500).json({ message: "Authorization error" });
      }
    };
  };