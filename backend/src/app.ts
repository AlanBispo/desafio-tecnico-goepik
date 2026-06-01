import cors from "cors";
import express from "express";

import { booksRoutes } from "./routes/booksRoutes.js";
import { healthRoutes } from "./routes/healthRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/books", booksRoutes);
