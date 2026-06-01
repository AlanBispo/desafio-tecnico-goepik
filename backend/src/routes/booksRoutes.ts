import { Router } from "express";

import {
  getBooks,
  postBook,
  removeBook,
} from "../controllers/booksController.js";

export const booksRoutes = Router();

booksRoutes.get("/", getBooks);
booksRoutes.post("/", postBook);
booksRoutes.delete("/:id", removeBook);
