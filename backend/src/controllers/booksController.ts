import { Request, Response } from "express";

import {
  createBook,
  deleteBook,
  listBooks,
} from "../services/booksService.js";
import { CreateBookInput, CreateBookRequestBody } from "../types/Book.js";

function parseCreateBookBody(body: CreateBookRequestBody): {
  data: CreateBookInput | null;
  errors: string[];
} {
  const errors: string[] = [];
  const title =
    typeof body.title === "string" && body.title.trim().length > 0
      ? body.title.trim()
      : null;
  const author =
    typeof body.author === "string" && body.author.trim().length > 0
      ? body.author.trim()
      : null;
  const year =
    typeof body.year === "number" &&
    Number.isInteger(body.year) &&
    body.year > 0
      ? body.year
      : null;

  if (!title) {
    errors.push("O título é obrigatório.");
  }

  if (!author) {
    errors.push("O autor é obrigatório.");
  }

  if (!year) {
    errors.push("O ano deve ser um número inteiro positivo.");
  }

  if (title === null || author === null || year === null) {
    return { data: null, errors };
  }

  return {
    data: {
      title,
      author,
      year,
    },
    errors,
  };
}

export function getBooks(_request: Request, response: Response) {
  return response.status(200).json(listBooks());
}

export function postBook(
  request: Request<unknown, unknown, CreateBookRequestBody>,
  response: Response
) {
  const { data, errors } = parseCreateBookBody(request.body);

  if (!data) {
    return response.status(400).json({ errors });
  }

  const book = createBook(data);

  return response.status(201).json(book);
}

export function removeBook(request: Request<{ id: string }>, response: Response) {
  const wasDeleted = deleteBook(request.params.id);

  if (!wasDeleted) {
    return response.status(404).json({ message: "Livro não encontrado." });
  }

  return response.status(204).send();
}
