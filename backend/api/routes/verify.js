const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sessionId = req.cookies?.session_id;

    if (!sessionId) {
      return res.json(false);
    }

    const result = await pool.query(
      `
      SELECT id
      FROM sessions
      WHERE id = $1
      AND expires_at > NOW()
      `,
      [sessionId]
    );

    const session = result.rows[0];

    if (!session) {
      return res.json(false);
    }

    return res.json(true);

  } catch (err) {
    console.error("Verify check error:", err);
    return res.status(500).json(false);
  }
});

module.exports = router;