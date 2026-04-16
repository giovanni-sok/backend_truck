const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/modules/**/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;