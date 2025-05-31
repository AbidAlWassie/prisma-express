import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// Create User
router.post("/", async (req, res) => {
  const { email, name } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: "Failed to create user",
      details: err,
    });
  }
});

// Get all users
router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default router;
