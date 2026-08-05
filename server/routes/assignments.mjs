import { Router } from "express";
import postValidation from "../middlewares/validatePost.mjs";
import { createPost } from "./posts.mjs";

const router = Router();

router.post("/", postValidation, createPost);

export default router;
