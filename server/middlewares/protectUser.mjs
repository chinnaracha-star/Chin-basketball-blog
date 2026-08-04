import {
  createSupabaseClient,
  getBearerToken,
} from "../utils/supabase.mjs";

const protectUser = async (req, res, next) => {
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

    req.user = { ...data.user };
    return next();
  } catch (error) {
    console.error("Protect user error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default protectUser;
