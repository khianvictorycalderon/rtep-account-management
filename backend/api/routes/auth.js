const express = require("express");
const { SESSION_CLEANUP_CHANCE } = require("../constants");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {

    // Auto cleanup (Not always, chance only)
    if (Math.random() < SESSION_CLEANUP_CHANCE) {
        pool.query(`
            DELETE FROM sessions
            WHERE expires_at < NOW()
        `).catch(() => {});
    }

    try {
        const sessionId = req.cookies?.session_id;

        // No cookie = not logged in
        if (!sessionId) {
            return res.json(false);
        }

        // Check session in DB
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

        // Invalid or expired session
        if (!session) {
            return res.json(false);
        }

        // Valid session
        return res.json(true);

    } catch (err) {
        console.error("Auth check error:", err);
        return res.status(500).json(false);
    }
});

module.exports = router;