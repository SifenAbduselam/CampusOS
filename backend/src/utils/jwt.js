import jwt from "jsonwebtoken";

const sevenDays = 7 * 24 * 60 * 60 * 1000;

export function signAuthToken(user) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function setAuthCookie(res, token) {
  res.cookie("campusos_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: sevenDays
  });
}

export function clearAuthCookie(res) {
  res.clearCookie("campusos_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  });
}