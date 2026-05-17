import ContactMessage from "../models/ContactMessage.js";

export async function createMessage(req, res) {
  const { name, message } = req.body;
  if (!name || !message) return res.status(400).json({ message: "Name and message are required" });
  await ContactMessage.create(req.body);
  res.status(201).json({ message: "Message received" });
}
