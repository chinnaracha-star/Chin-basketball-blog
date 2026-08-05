import { Router } from "express";
import { randomUUID } from "node:crypto";
import path from "node:path";
import protectUser from "../middlewares/protectUser.mjs";
import uploadProfileImage from "../middlewares/uploadProfileImage.mjs";
import connectionPool from "../utils/db.mjs";
import {
  createSupabaseClient,
  getBearerToken,
} from "../utils/supabase.mjs";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    data: {
      name: "john",
      age: 20,
    },
  });
});

router.put("/", protectUser, uploadProfileImage, async (req, res) => {
  const { id: userId, email } = req.user;
  const name = req.body.name?.trim();
  const username = req.body.username?.trim();
  const file = req.files?.imageFile?.[0];
  const bucketName =
    process.env.SUPABASE_STORAGE_BUCKET || "my-personal-blog";
  let supabase = null;
  let uploadedPath = null;

  if (!name && !username && !file) {
    return res.status(400).json({ message: "No fields to update provided" });
  }

  try {
    let profilePicUrl = null;

    if (file) {
      supabase = createSupabaseClient(getBearerToken(req));
      const extension = path.extname(file.originalname).toLowerCase();
      const filePath = `profiles/${userId}_${Date.now()}_${randomUUID()}${extension}`;
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
      profilePicUrl = publicUrl;
    }

    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      values.push(name);
      fieldsToUpdate.push(`name = $${values.length}`);
    }
    if (username) {
      values.push(username);
      fieldsToUpdate.push(`username = $${values.length}`);
    }
    if (profilePicUrl) {
      values.push(profilePicUrl);
      fieldsToUpdate.push(`profile_pic = $${values.length}`);
    }

    values.push(userId);
    const { rows } = await connectionPool.query(
      `UPDATE users
       SET ${fieldsToUpdate.join(", ")}
       WHERE id = $${values.length}
       RETURNING id, username, name, profile_pic, role`,
      values,
    );

    if (!rows.length) {
      throw new Error("User profile not found");
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: rows[0].id,
        email,
        username: rows[0].username,
        name: rows[0].name,
        role: rows[0].role,
        profilePic: rows[0].profile_pic,
      },
    });
  } catch (error) {
    if (uploadedPath && supabase) {
      const { error: cleanupError } = await supabase.storage
        .from(bucketName)
        .remove([uploadedPath]);
      if (cleanupError) {
        console.error(
          "Could not remove orphaned profile image:",
          cleanupError.message,
        );
      }
    }

    if (error.code === "23505") {
      return res.status(409).json({ message: "This username is already taken" });
    }

    console.error("Update profile error:", error.message);
    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
});

export default router;
