import { Book } from "../types/book";

type BooksListProps = {
  books: Book[];
  deletingBookId: string | null;
  emptyDescription: string;
  emptyTitle: string;
  onDelete: (bookId: string) => Promise<void>;
};

export function BooksList({
  books,
  deletingBookId,
  emptyDescription,
  emptyTitle,
  onDelete,
}: BooksListProps) {
  if (books.length === 0) {
    return (
      <div className="books-empty">
        <strong>{emptyTitle}</strong>
        <span>{emptyDescription}</span>
      </div>
    );
  }

  return (
    <ul className="books-list">
      {books.map((book) => (
        <li className="books-list__item" key={book.id}>
          <div className="books-list__details">
            <strong>Livro: {book.title}</strong>
            <span>Autor: {book.author}</span>
            <span>Ano: {book.year}</span>
          </div>

          <div className="books-list__actions">
            <button
              className="books-list__delete"
              disabled={deletingBookId === book.id}
              onClick={() => onDelete(book.id)}
              type="button"
            >
              {deletingBookId === book.id ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
