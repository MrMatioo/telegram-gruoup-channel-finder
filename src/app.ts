import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import rateLimit from "express-rate-limit";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

import { AppDataSource } from "./config/data-source";
import { TelegramService } from "./services/telegram.services";
import { SearchController } from "./controllers/search.controller";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const telegramService = new TelegramService();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests from this IP, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/search", apiLimiter);

const swaggerOptions = {
  customCss: `
    .swagger-ui .opblock.opblock-get { background: rgba(46, 204, 113, 0.1); border-color: #2ecc71; }
    .swagger-ui .opblock.opblock-get .opblock-summary-method { background: #2ecc71; }
    .swagger-ui .opblock.opblock-get .opblock-summary { border-color: #2ecc71; }
    .swagger-ui .btn.execute { background-color: #e74c3c; color: white; border-color: #e74c3c; }
    .swagger-ui .btn.execute:hover { background-color: #c0392b; border-color: #c0392b; }
  `,
};

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("PostgreSQL connected successfully! 🐘");

    await telegramService.initialize();

    const searchController = new SearchController(telegramService);

    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument, swaggerOptions),
    );

    app.get("/api/search", (req, res) => searchController.search(req, res));

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(
        `📖 API Documentation available at http://localhost:${PORT}/api-docs`,
      );
    });
  } catch (error) {
    console.error("Failed to start application:", error);
  }
}

startServer();
