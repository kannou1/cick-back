require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectToMongoDB = require("./db/db").connectToMongoDB;
const contactRoutes = require("./routes/contact.routes");
const projectRoutes = require("./routes/project.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// CORS config
const allowedOrigins = [
  "http://localhost:5173", // frontend local Vite
  "http://localhost:3000", // si tu testes avec Next
  "https://cick-back.onrender.com", // backend lui-même, optionnel
  // ajoute ici ton vrai frontend déployé plus tard
  // "https://ton-frontend.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Autorise Postman, Render health checks, etc. sans origin
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Important for preflight requests
app.options("*", cors());

app.use(express.json());

// Static images
app.use("/images", express.static("public/images"));

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CICK API is running");
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});