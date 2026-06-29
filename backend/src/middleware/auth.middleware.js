import jwt from "jsonwebtoken";
import { users } from "../data/users.js";
import { createPublicUser } from "../utils/createPublicUser.js";

export function requireAuth(req, res, next) {
  const token = req.cookies.campusos_token;

  if (!token) {
    return res.status(401).json({
      message: "You must be logged in to access this route."
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find((currentUser) => currentUser.id === payload.id);

    if (!user) {
      return res.status(401).json({
        message: "User session is no longer valid."
      });
    }

    req.user = createPublicUser(user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired session."
    });
  }
}