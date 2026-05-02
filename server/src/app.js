const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const healthRoutes = require("./routes/health.routes");
const dbTestRoutes = require("./routes/dbTest.routes");
const authRoutes = require("./routes/auth.routes");
const propertyRoutes = require("./routes/property.routes");
const partnerRoutes = require("./routes/partner.routes");
const adminRoutes = require("./routes/admin.routes");
const bookingRoutes = require("./routes/booking.routes");

const app = express();

/*
  Allowed frontend URLs:
  - Local tourist frontend: http://localhost:5173
  - Local admin frontend: http://localhost:5174
  - Deployed Vercel frontend
  - Railway environment variables CLIENT_URL and ADMIN_CLIENT_URL
*/
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://e23-co2060-hotel-management-system.vercel.app",
  process.env.CLIENT_URL,
  process.env.ADMIN_CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin, like Postman, curl, or server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", healthRoutes);
app.use("/api", dbTestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("TourismHub LK Backend API");
});

// Simple CORS test route
app.get("/api/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is working",
    origin: req.headers.origin || "No origin header",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    path: req.originalUrl,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);

  if (err.message && err.message.startsWith("Not allowed by CORS")) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Allowed CORS origins:", allowedOrigins);
});