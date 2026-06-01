import { env } from "../../../config/env";
import { Book, CreateBookInput } from "../types/book";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error("Não foi possível concluir a operação.");
  }

  return response.json() as Promise<T>;
}

export async function getBooks() {
  const response = await fetch(`${env.apiBaseUrl}/books`);

  return handleResponse<Book[]>(response);
}

export async function createBook(data: CreateBookInput) {
  const response = await fetch(`${env.apiBaseUrl}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Book>(response);
}

export async function deleteBook(id: string) {
  const response = await fetch(`${env.apiBaseUrl}/books/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Não foi possível excluir o livro.");
  }
}
