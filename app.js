require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectToMongoDB = require('./db/db').connectToMongoDB;
const contactRoutes = require('./routes/contact.routes');
const errorHandler = require('./middlewares/error.middleware');
const projectRoutes = require("./routes/project.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));


app.use("/api/projects", projectRoutes);
// Health check (optional but useful)
app.get('/', (req, res) => {
  res.send('CICK API is running');
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`✅ Serveur HTTP & Socket.IO lancé sur le port ${PORT}`);
});