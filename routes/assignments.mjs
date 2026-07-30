import { Router } from "express";
import { createPost } from "./posts.mjs";

const router = Router();

router.post("/", createPost);

export default router;
