const swaggerJsdoc = require("swagger-jsdoc");

// Créer un middleware qui génère les specs dynamiquement avec l'URL correcte
function generateSwaggerSpec(req) {
  // Déterminer l'URL de base depuis la requête
  const protocol = req.get('X-Forwarded-Proto') || req.protocol || 'http';
  const host = req.get('X-Forwarded-Host') || req.get('host') || 'localhost:5001';
  const baseUrl = `${protocol}://${host}`;

  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API truck Backend",
        version: "1.0.0",
        description: "Documentation de ton backend",
      },
      servers: [
        {
          url: baseUrl,
          description: "Current server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Entrez votre token JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ["./src/modules/**/*.js"],
  };

  return swaggerJsdoc(options);
}

module.exports = generateSwaggerSpec;