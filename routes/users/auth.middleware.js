import jwt from "jsonwebtoken";

export const checkForAuthentication = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).json({ msg: "Token is not valid." });
  }
};
