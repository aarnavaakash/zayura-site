import User from "../models/User.js";

export async function ensureAdminUser() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;

  const admin = await User.findOne({ email: ADMIN_EMAIL });
  if (!admin) {
    await User.create({
      name: process.env.ADMIN_NAME || "Zayura Admin",
      email: ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE || "",
      password: ADMIN_PASSWORD,
      role: "admin"
    });
    console.log(`Admin user created: ${ADMIN_EMAIL}`);
    return;
  }

  const updates = {
    name: process.env.ADMIN_NAME || admin.name,
    phone: process.env.ADMIN_PHONE || admin.phone,
    role: "admin"
  };

  const passwordMatches = await admin.matchPassword(ADMIN_PASSWORD);
  Object.assign(admin, updates);
  if (!passwordMatches) admin.password = ADMIN_PASSWORD;
  await admin.save();
  console.log(`Admin user ready: ${ADMIN_EMAIL}`);
}
