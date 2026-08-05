import { Router } from "express";
import { randomUUID } from "node:crypto";
import path from "node:path";
import protectAdmin from "../middlewares/protectAdmin.mjs";
import uploadPostImage from "../middlewares/uploadPostImage.mjs";
import postValidation from "../middlewares/validatePost.mjs";
import db from "../utils/db.mjs";
import {
  createSupabaseClient,
  getBearerToken,
} from "../utils/supabase.mjs";

const router = Router();
const PAGE_SIZE = 6;

function getPostSelectQuery() {
  return `
    SELECT
      posts.id,
      posts.image,
      posts.category_id,
      categories.name AS category,
      posts.title,
      posts.description,
      posts.date,
      posts.content,
      posts.status_id,
      statuses.status,
      posts.likes_count,
      posts.likes_count AS likes,
      'john' AS author
    FROM posts
    LEFT JOIN categories ON posts.category_id = categories.id
    LEFT JOIN statuses ON posts.status_id = statuses.id
  `;
}

function getPositiveInteger(value, fallback) {
  const number = Number(value);

  if (!Number.isInteger(number) || number < 1) {
    return fallback;
  }

  return number;
}

export const createPost = async (req, res) => {
  const { title, image, category_id, description, content, status_id } = req.body;

  try {
    await db.query(
      `INSERT INTO posts
        (title, image, category_id, description, content, status_id)
       VALUES
        ($1, $2, $3, $4, $5, $6)`,
      [title, image, category_id, description, content, status_id]
    );

    return res.status(201).json({
      message: "Created post successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server could not create post because database connection",
    });
  }
};

function parsePositiveInteger(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : null;
}

function validateUploadedPost(post, file) {
  if (!file) return "Thumbnail image is required";
  if (!post.title?.trim()) return "Title is required";
  if (!parsePositiveInteger(post.category_id)) {
    return "Category ID must be a positive integer";
  }
  if (!post.description?.trim()) return "Description is required";
  if (!post.content?.trim()) return "Content is required";
  if (!parsePositiveInteger(post.status_id)) {
    return "Status ID must be a positive integer";
  }
  return null;
}

async function createPostWithImage(req, res) {
  const newPost = req.body;
  const file = req.files?.imageFile?.[0];
  const validationError = validateUploadedPost(newPost, file);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const bucketName =
    process.env.SUPABASE_STORAGE_BUCKET || "my-personal-blog";
  const extension = path.extname(file.originalname).toLowerCase();
  const filePath = `posts/${Date.now()}_${randomUUID()}${extension}`;
  const supabase = createSupabaseClient(getBearerToken(req));
  let uploadedPath = null;

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw error;
    uploadedPath = data.path;

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(uploadedPath);

    const categoryId = parsePositiveInteger(newPost.category_id);
    const statusId = parsePositiveInteger(newPost.status_id);
    const { rows } = await db.query(
      `INSERT INTO posts
        (title, image, category_id, description, content, status_id)
       VALUES
        ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        newPost.title.trim(),
        publicUrl,
        categoryId,
        newPost.description.trim(),
        newPost.content.trim(),
        statusId,
      ],
    );

    return res.status(201).json({
      message: "Created post successfully",
      post: rows[0],
    });
  } catch (error) {
    if (uploadedPath) {
      const { error: cleanupError } = await supabase.storage
        .from(bucketName)
        .remove([uploadedPath]);
      if (cleanupError) {
        console.error("Could not remove orphaned image:", cleanupError.message);
      }
    }

    console.error("Create post with image error:", error.message);
    return res.status(500).json({
      message: "Server could not create post",
      error: error.message,
    });
  }
}

router.post("/", protectAdmin, uploadPostImage, createPostWithImage);

router.get("/", async (req, res) => {
  const page = getPositiveInteger(req.query.page, 1);
  const limit = getPositiveInteger(req.query.limit, PAGE_SIZE);
  const offset = (page - 1) * limit;
  const { category, keyword, status } = req.query;

  const conditions = [];
  const values = [];

  if (category) {
    values.push(category);
    conditions.push(`categories.name ILIKE $${values.length}`);
  }

  if (keyword) {
    values.push(`%${keyword}%`);
    conditions.push(`(
      posts.title ILIKE $${values.length}
      OR posts.description ILIKE $${values.length}
      OR posts.content ILIKE $${values.length}
    )`);
  }

  if (status) {
    values.push(status);
    conditions.push(`statuses.status = $${values.length}`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  try {
    const countResult = await db.query(
      `
        SELECT COUNT(*)::int AS total
        FROM posts
        LEFT JOIN categories ON posts.category_id = categories.id
        LEFT JOIN statuses ON posts.status_id = statuses.id
        ${whereClause}
      `,
      values
    );

    const totalPosts = countResult.rows[0].total;

    values.push(limit, offset);
    const postsResult = await db.query(
      `
        ${getPostSelectQuery()}
        ${whereClause}
        ORDER BY posts.date DESC, posts.id DESC
        LIMIT $${values.length - 1}
        OFFSET $${values.length}
      `,
      values
    );

    return res.status(200).json({
      posts: postsResult.rows,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server could not get posts because database connection",
    });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const result = await db.query(
      `
        ${getPostSelectQuery()}
        WHERE posts.id = $1
      `,
      [req.params.postId]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server could not get post because database connection",
    });
  }
});

router.put("/:postId", postValidation, async (req, res) => {
  const { title, image, category_id, description, content, status_id } = req.body;

  try {
    const result = await db.query(
      `
        UPDATE posts
        SET
          title = $1,
          image = $2,
          category_id = $3,
          description = $4,
          content = $5,
          status_id = $6
        WHERE id = $7
        RETURNING id
      `,
      [
        title,
        image,
        category_id,
        description,
        content,
        status_id,
        req.params.postId,
      ]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Updated post successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server could not update post because database connection",
    });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const result = await db.query(
      `
        DELETE FROM posts
        WHERE id = $1
        RETURNING id
      `,
      [req.params.postId]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      message: "Deleted post successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server could not delete post because database connection",
    });
  }
});

export default router;
