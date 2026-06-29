import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { users } from "../data/users.js";
import { createPublicUser } from "../utils/createPublicUser.js";
import { clearAuthCookie, setAuthCookie, signAuthToken } from "../utils/jwt.js";
import { validateLoginInput, validateRegisterInput } from "../utils/validators.js";

export async function register(req, res) {
  const validation = validateRegisterInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: "Registration validation failed.",
      errors: validation.errors
    });
  }

  const email = req.body.email.trim().toLowerCase();
  const studentId = req.body.studentId.trim().toUpperCase();

  const existingUser = users.find(
    (user) => user.email === email || user.studentId === studentId
  );

  if (existingUser) {
    return res.status(409).json({
      message: "A user with this email or student ID already exists."
    });
  }

  const passwordHash = await bcrypt.hash(req.body.password, 12);

  const user = {
    id: randomUUID(),
    fullName: req.body.fullName.trim(),
    email,
    studentId,
    department: req.body.department.trim(),
    year: Number(req.body.year),
    role: "student",
    passwordHash,
    createdAt: new Date().toISOString()
  };

  users.push(user);

  const token = signAuthToken(user);
  setAuthCookie(res, token);

  return res.status(201).json({
    message: "Registration successful.",
    user: createPublicUser(user)
  });
}

export async function login(req, res) {
  const validation = validateLoginInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: "Login validation failed.",
      errors: validation.errors
    });
  }

  const email = req.body.email.trim().toLowerCase();
  const user = users.find((currentUser) => currentUser.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const passwordMatches = await bcrypt.compare(req.body.password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = signAuthToken(user);
  setAuthCookie(res, token);

  return res.status(200).json({
    message: "Login successful.",
    user: createPublicUser(user)
  });
}

export function logout(req, res) {
  clearAuthCookie(res);
  return res.status(200).json({ message: "Logout successful." });
}

export function getMe(req, res) {
  return res.status(200).json({ user: req.user });
}