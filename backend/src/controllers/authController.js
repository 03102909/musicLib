const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "music_library_secret_key_2026";
const SALT_ROUNDS = 10;

const register = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email та пароль обов'язкові" });
    }

    const existing = await prisma.users.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Користувач з таким email вже існує" });
    }

    const allowedRoles = ["user", "admin"];
    const userRole = allowedRoles.includes(role) ? role : "user";

    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.users.create({
      data: { email, password_hash, role: userRole },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email та пароль обов'язкові" });
    }

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: "Невірний email або пароль" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { register, login, me };
