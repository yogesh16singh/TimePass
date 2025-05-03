"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
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
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    // Serve Swagger UI
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    // Expose Swagger JSON
    app.get("/api-docs-json", (req, res) => {
        res.json(specs);
    });
};
exports.setupSwagger = setupSwagger;
