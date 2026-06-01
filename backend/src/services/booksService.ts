import { randomUUID } from "node:crypto";

import { Book, CreateBookInput } from "../types/Book.js";

const books: Book[] = [];

export function listBooks() {
  return books;
}

export function createBook(data: CreateBookInput) {
  const book: Book = {
    id: randomUUID(),
    title: data.title,
    author: data.author,
    year: data.year,
  };

  books.push(book);

  return book;
}

export function deleteBook(id: string) {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    return false;
  }

  books.splice(bookIndex, 1);

  return true;
}
