import "dotenv/config";
import cors from "cors";
import express from "express";
import assignmentsRouter from "./routes/assignments.mjs";
import authRouter from "./routes/auth.mjs";
import healthRouter from "./routes/health.mjs";
import postsRouter from "./routes/posts.mjs";
import profilesRouter from "./routes/profiles.mjs";
import protectAdmin from "./middlewares/protectAdmin.mjs";
import protectUser from "./middlewares/protectUser.mjs";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
  })
);

app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/profiles", profilesRouter);
app.use("/assignments", assignmentsRouter);
app.use("/posts", postsRouter);

app.get("/protected-route", protectUser, (req, res) => {
  res.json({ message: "This is protected content", user: req.user });
});

app.get("/admin-only", protectAdmin, (req, res) => {
  res.json({ message: "This is admin-only content", admin: req.user });
});

if (process.argv[1]?.endsWith("app.mjs")) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
