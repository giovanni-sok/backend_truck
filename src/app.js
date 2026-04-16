const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    // Origins autorisées
    const allowedOrigins = [
      'http://localhost:3000',        // Frontend dev local
      'http://localhost:5000',        // Swagger local
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5000',
      process.env.FRONTEND_URL,       // Frontend en production (ex: https://gettruck.com)
      process.env.API_URL,            // API URL
    ].filter(Boolean);

    // En développement, autoriser tous les origins
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // En production, vérifier la liste blanche
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));
app.use(express.json());
// Routes API pour authentification et gestion des utilisateurs
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
module.exports = app;