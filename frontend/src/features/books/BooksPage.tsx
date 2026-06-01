import { useEffect, useMemo, useState } from "react";

import { BookModal } from "./components/BookModal";
import { BooksList } from "./components/BooksList";
import { BooksToolbar } from "./components/BooksToolbar";
import { createBook, deleteBook, getBooks } from "./services/booksApi";
import "./books.css";
import { Book, CreateBookInput } from "./types/book";

type SortOrder = "asc" | "desc";

export function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredBooks = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return books
      .filter((book) =>
        book.title.toLowerCase().includes(normalizedSearch)
      )
      .sort((firstBook, secondBook) => {
        if (sortOrder === "asc") {
          return firstBook.year - secondBook.year;
        }

        return secondBook.year - firstBook.year;
      });
  }, [books, searchTerm, sortOrder]);

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

  async function handleDeleteBook(bookId: string) {
    setError("");
    setDeletingBookId(bookId);

    try {
      await deleteBook(bookId);

      setBooks((currentBooks) =>
        currentBooks.filter((book) => book.id !== bookId)
      );
    } catch {
      setError("Não foi possível excluir o livro.");
    } finally {
      setDeletingBookId(null);
    }
  }

  const emptyTitle =
    books.length === 0 ? "Nenhum livro cadastrado." : "Nenhum livro encontrado.";
  const emptyDescription =
    books.length === 0
      ? "Clique em Novo livro para adicionar o primeiro cadastro."
      : "Tente buscar por outro título.";

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

        <BooksToolbar
          onSearchTermChange={setSearchTerm}
          onSortOrderChange={setSortOrder}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
        />

        {isLoading ? (
          <div className="books-feedback">Carregando livros...</div>
        ) : (
          <BooksList
            books={filteredBooks}
            deletingBookId={deletingBookId}
            emptyDescription={emptyDescription}
            emptyTitle={emptyTitle}
            onDelete={handleDeleteBook}
          />
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
