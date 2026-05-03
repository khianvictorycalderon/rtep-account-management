const pool = require("../db");

module.exports = async function verify(req, res, next) {
  try {
    const sessionId = req.cookies?.session_id;

    if (!sessionId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await pool.query(
      `
      SELECT user_id
      FROM sessions
      WHERE id = $1
      AND expires_at > NOW()
      `,
      [sessionId]
    );

    const session = result.rows[0];

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = { id: session.user_id };
    next();
  } catch (err) {
    console.error("Verify middleware error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};