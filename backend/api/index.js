// ---------------------------------------------------------
// Imports
// ---------------------------------------------------------
const { PORT } = require("./constants");
require("dotenv").config(); // Load env FIRST
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// ---------------------------------------------------------
// CORS Allowed origins
// ---------------------------------------------------------
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
  ? process.env.CORS_ALLOWED_ORIGINS.split(",")
  : [];

// ---------------------------------------------------------
// Middlewares
// ---------------------------------------------------------
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------------
// APIs
// ---------------------------------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Hello World from Express 🚀 as Serverless API!" });
});

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/verify", require("./routes/verify"));

// ---------------------------------------------------------
// Protected routes
// ---------------------------------------------------------
const auth = require("./middleware/auth");
app.use(auth);
app.use("/api/users", require("./protected_routes/users"));
/*
  Add more protected paths below
*/

// ===================== HERE ==========================

// ---------------------------------------------------------
// Development testing (nodemon)
// ---------------------------------------------------------
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// ---------------------------------------------------------
// Vercel export (Serverless APIs)
// ---------------------------------------------------------
module.exports = app;