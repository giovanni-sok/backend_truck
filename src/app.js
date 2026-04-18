const express = require("express");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const generateSwaggerSpec = require("./config/swagger");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    // Origins autorisées
    const allowedOrigins = [
      // Localhost
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5000',
      'http://localhost:5001',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:5000',
      'http://127.0.0.1:5001',
      'http://127.0.0.1:5173',
      // Domaine
      'http://backend-gettruck.totonlionel.com',
      'http://backend-gettruck.totonlionel.com:5001',
      'https://backend-gettruck.totonlionel.com',
      'https://backend-gettruck.totonlionel.com:5001',
      // Frontend Netlify
      'https://gettruck.netlify.app',
      // Variables d'env
      process.env.FRONTEND_URL,
      process.env.API_URL,
    ].filter(Boolean);

    // Sans origin = requête depuis le même serveur (Swagger UI) → accepter
    if (!origin) {
      callback(null, true);
      return;
    }

    // En développement, autoriser tous les origins
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
      return;
    }

    // En production, vérifier la liste blanche
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Log pour debug
      console.warn(`CORS rejected origin: ${origin}`);
      console.warn(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
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
// Swagger avec URL dynamique
app.use("/api-docs", swaggerUi.serve, (req, res, next) => {
  const swaggerSpec = generateSwaggerSpec(req);
  swaggerUi.setup(swaggerSpec)(req, res, next);
});
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
module.exports = app;