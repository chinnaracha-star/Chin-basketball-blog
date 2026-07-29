import "dotenv/config";
import cors from "cors";
import express from "express";
import db from "./utils/db.mjs";

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

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.get("/profiles", (req, res) => {
  res.status(200).json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

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

function isMissingPostData(post) {
  return (
    !post.title ||
    !post.image ||
    !post.category_id ||
    !post.description ||
    !post.content ||
    !post.status_id
  );
}

const createPost = async (req, res) => {
  const { title, image, category_id, description, content, status_id } = req.body;

  if (isMissingPostData(req.body)) {
    return res.status(400).json({
      message:
        "Server could not create post because there are missing data from client",
    });
  }

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

app.post("/assignments", createPost);
app.post("/posts", createPost);

app.get("/posts", async (req, res) => {
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

app.get("/posts/:postId", async (req, res) => {
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

app.put("/posts/:postId", async (req, res) => {
  const { title, image, category_id, description, content, status_id } = req.body;

  if (isMissingPostData(req.body)) {
    return res.status(400).json({
      message:
        "Server could not update post because there are missing data from client",
    });
  }

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

app.delete("/posts/:postId", async (req, res) => {
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

if (process.argv[1]?.endsWith("app.mjs")) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
