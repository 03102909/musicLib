const prisma = require("../config/prisma");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        library_item: true,
      },
    });

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.users.findUnique({
      where: { id },
      include: {
        library_item: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password_hash, role } = req.body;

    const user = await prisma.users.create({
      data: {
        email,
        password_hash,
        role,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};
