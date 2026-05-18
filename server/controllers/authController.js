import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

const publicUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  address: user.address
});

export async function register(req, res) {
  const { name, phone, password } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const user = await User.create({ name, email, phone, password });
  res.status(201).json({ user: publicUser(user), token: signToken(user._id) });
}

export async function login(req, res) {
  const { password } = req.body;
  const email = req.body.email?.trim().toLowerCase();
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ user: publicUser(user), token: signToken(user._id) });
}

export async function me(req, res) {
  res.json({ user: req.user });
}
