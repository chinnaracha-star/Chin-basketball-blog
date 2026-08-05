import connectionPool from "../utils/db.mjs";
import {
  createSupabaseClient,
  getBearerToken,
} from "../utils/supabase.mjs";

const protectAdmin = async (req, res, next) => {
  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const { rows } = await connectionPool.query(
      `SELECT role FROM users WHERE id = $1`,
      [data.user.id],
    );
    if (!rows.length) {
      return res.status(404).json({ error: "User role not found" });
    }

    req.user = { ...data.user, role: rows[0].role };
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not have admin access" });
    }

    return next();
  } catch (error) {
    console.error("Protect admin error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectAdmin;
