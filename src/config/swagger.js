const swaggerJsdoc = require("swagger-jsdoc");

const API_URL = process.env.API_URL || "http://localhost:5001";

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
        url: API_URL,
      },
    ],
  },
  apis: ["./src/modules/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;