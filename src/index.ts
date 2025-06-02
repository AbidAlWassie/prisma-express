import express from "express";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
