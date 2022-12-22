const JWT = require("jsonwebtoken");
const { UnAuthError } = require("../errors");

const authenticationMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    throw new UnAuthError("No token provided");
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const { fakeID: id, username } = decoded.payload;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnAuthError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
