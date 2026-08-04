import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import {
  createSupabaseClient,
  getBearerToken,
} from "../utils/supabase.mjs";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username, name } = req.body;

  if (!email || !password || !username?.trim() || !name?.trim()) {
    return res.status(400).json({
      error: "Email, password, username and name are required",
    });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const { rows: existingUsers } = await connectionPool.query(
      `SELECT id FROM users WHERE LOWER(username) = LOWER($1) LIMIT 1`,
      [username.trim()],
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "This username is already taken" });
    }

    const supabase = createSupabaseClient();
    const { data, error: supabaseError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (supabaseError) {
      if (
        supabaseError.code === "user_already_exists" ||
        supabaseError.message?.toLowerCase().includes("already registered")
      ) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      return res
        .status(400)
        .json({ error: "Failed to create user. Please try again." });
    }

    if (!data.user) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    const { rows } = await connectionPool.query(
      `INSERT INTO users (id, username, name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.user.id, username.trim(), name.trim(), "user"],
    );

    return res.status(201).json({
      message: "User created successfully",
      user: rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(500)
      .json({ error: "An error occurred during registration" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      if (
        error.code === "invalid_credentials" ||
        error.message?.includes("Invalid login credentials")
      ) {
        return res.status(400).json({
          error: "Your password is incorrect or this email doesn't exist",
        });
      }
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Signed in successfully",
      access_token: data.session.access_token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

authRouter.get("/get-user", async (req, res) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized or token expired" });
    }

    const { rows } = await connectionPool.query(
      `SELECT username, name, role, profile_pic FROM users WHERE id = $1`,
      [data.user.id],
    );

    if (!rows.length) {
      return res.status(404).json({ error: "User profile not found" });
    }

    return res.status(200).json({
      id: data.user.id,
      email: data.user.email,
      username: rows[0].username,
      name: rows[0].name,
      role: rows[0].role,
      profilePic: rows[0].profile_pic,
    });
  } catch (error) {
    console.error("Get user error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.put("/reset-password", async (req, res) => {
  const token = getBearerToken(req);
  const { oldPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }
  if (!oldPassword) {
    return res.status(400).json({ error: "Old password is required" });
  }
  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  try {
    const supabase = createSupabaseClient();
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData.user?.email) {
      return res.status(401).json({ error: "Unauthorized or token expired" });
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: userData.user.email,
      password: oldPassword,
    });
    if (loginError) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    const authenticatedSupabase = createSupabaseClient(token);
    const { error } = await authenticatedSupabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
