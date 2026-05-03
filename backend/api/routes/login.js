const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;

        // -----------------------------
        // Validate input
        // -----------------------------
        if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
        }

        // -----------------------------
        // Find user
        // -----------------------------
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        // -----------------------------
        // Check password
        // -----------------------------
        const isValid = await bcrypt.compare(password, user.password_hash);

            if (!isValid) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        // -----------------------------
        // Create session
        // -----------------------------
        const sessionId = uuidv4();

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        // Optional: extract metadata
        const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress;

        const userAgent = req.headers["user-agent"] || "";

        await pool.query(
            `
            INSERT INTO sessions (
                id,
                user_id,
                ip,
                user_agent,
                expires_at
            )
            VALUES ($1, $2, $3, $4, $5)
            `,
            [sessionId, user.id, ip, userAgent, expiresAt]
        );

        // -----------------------------
        // Set HTTP-only cookie
        // -----------------------------
        res.cookie("session_id", sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", // Next.js-style safe default
            expires: expiresAt,
            path: "/",
        });

        // -----------------------------
        // Response
        // -----------------------------
        return res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    });

module.exports = router;