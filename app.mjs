import "dotenv/config";
import express from "express";
import db from "./utils/db.mjs";

const app = express();

app.use(express.json());

app.get("/profiles", (req, res) => {
  res.status(200).json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

app.post("/assignments", async (req, res) => {
  const { title, image, category_id, description, content, status_id } = req.body;

  if (
    !title ||
    !image ||
    !category_id ||
    !description ||
    !content ||
    !status_id
  ) {
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
});

export default app;
