import cors from "cors";
import express from "express";

import { booksRoutes } from "./routes/booksRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", booksRoutes);
