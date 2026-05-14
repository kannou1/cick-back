require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectToMongoDB = require("./db/db").connectToMongoDB;
const contactRoutes = require("./routes/contact.routes");
const projectRoutes = require("./routes/project.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

/* CORS must be BEFORE all routes */
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* Preflight requests */
app.options(/.*/, cors());

app.use(express.json());

/* Static images */
app.use("/images", express.static("public/images"));

/* Routes */
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

/* Health check */
app.get("/", (req, res) => {
  res.send("CICK API is running");
});

/* Error handler */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`✅ Serveur lancé sur le port ${PORT}`);
});