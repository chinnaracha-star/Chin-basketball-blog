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

function isAllowedOrigin(origin) {
  if (!origin) return true;

  const configured = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://chin-basketball-blog.vercel.app",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  if (configured.includes(origin)) return true;

  // Allow Vercel production / preview aliases for this project.
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "chin-basketball-blog.vercel.app" ||
      hostname.endsWith("-chin-basketball-blog.vercel.app") ||
      /^chin-basketball-blog(-[a-z0-9-]+)?\.vercel\.app$/i.test(hostname)
    );
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin(origin, callback) {
      // Never throw here — throwing becomes a 500 and breaks article loading.
      callback(null, isAllowedOrigin(origin));
    },
  }),
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
