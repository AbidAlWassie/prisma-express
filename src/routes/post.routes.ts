import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// Create Post
router.post("/", async (req, res) => {
  const { title, content, published, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, content, published, authorId },
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Failed to create post", details: err });
  }
});

// Get all Posts
router.get("/", async (_req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
});

// Get one Post
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return res.status(404).json({ error: "Post not found" });

  res.json(post);
});

// Update Post
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, published } = req.body;

  try {
    const updated = await prisma.post.update({
      where: { id },
      data: { title, content, published },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update post", details: err });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.post.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: "Failed to delete post", details: err });
  }
});

export default router;
