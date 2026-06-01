import { useEffect, useState } from "react";

import { BookModal } from "./components/BookModal";
import { BooksList } from "./components/BooksList";
import { createBook, getBooks } from "./services/booksApi";
import "./books.css";
import { Book, CreateBookInput } from "./types/book";

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadBooks() {
      try {
        const booksResponse = await getBooks();

        setBooks(booksResponse);
      } catch {
        setError("Não foi possível carregar os livros.");
      } finally {
        setIsLoading(false);
      }
    }

    loadBooks();
  }, []);

  async function handleCreateBook(bookData: CreateBookInput) {
    setError("");
    setIsSubmitting(true);

    try {
      const createdBook = await createBook(bookData);

      setBooks((currentBooks) => [...currentBooks, createdBook]);
      setIsModalOpen(false);
      return true;
    } catch {
      setError("Não foi possível cadastrar o livro.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="app books-page">
      <section className="app__header">
        <div>
          <h1>Gerenciador de Livros</h1>
          <p>Cadastre, visualize e organize seus livros.</p>
        </div>

        <button
          className="books-page__new-button"
          onClick={() => setIsModalOpen(true)}
          type="button"
        >
          Novo livro
        </button>
      </section>

      {error && (
        <div className="books-feedback books-feedback--error" role="alert">
          {error}
        </div>
      )}

      <section className="books-section" aria-labelledby="books-list-title">
        <h2 className="books-section__title" id="books-list-title">
          Livros cadastrados
        </h2>

        {isLoading ? (
          <div className="books-feedback">Carregando livros...</div>
        ) : (
          <BooksList books={books} />
        )}
      </section>

      {isModalOpen && (
        <BookModal
          isSubmitting={isSubmitting}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateBook}
        />
      )}
    </main>
  );
}
