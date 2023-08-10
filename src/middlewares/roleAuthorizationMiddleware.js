// Define the authorize middleware function
const authorize = (roles) => {
  return (req, res, next) => {
    const user = req.user; // Assuming you attach the user object to the request during JWT authentication
    if (!user || !user.role) {
      // If user is not authenticated or does not have a role, deny access
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (roles.includes(user.role)) {
      // If user's role is included in the roles array, grant access
      next();
    } else {
      // If user's role is not authorized, deny access
      return res.status(403).json({ message: "Unauthorized" });
    }
  };
};

module.exports = { authorize };
