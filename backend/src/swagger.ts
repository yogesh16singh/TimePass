import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Game CRUD API",
      version: "1.0.0",
      description: "API for managing games",
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://timepass-a7m2.onrender.com",
          // : "http://localhost:5500",

      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // Serve Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  // Expose Swagger JSON
  app.get("/api-docs-json", (req, res) => {
    res.json(specs);
  });
};
