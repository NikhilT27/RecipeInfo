const jwt = require("jsonwebtoken");

module.exports = (headers) => {
  const authHeader = headers.authorization;
  if (authHeader) {
    //Bearer schema in authorization header
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new Error("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
