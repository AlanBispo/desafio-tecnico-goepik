import { Book } from "../types/book";

type BooksListProps = {
  books: Book[];
};

export function BooksList({ books }: BooksListProps) {
  if (books.length === 0) {
    return (
      <div className="books-empty">
        <strong>Nenhum livro cadastrado.</strong>
        <span>Use o formulário para adicionar o primeiro livro.</span>
      </div>
    );
  }

  return (
    <ul className="books-list">
      {books.map((book) => (
        <li className="books-list__item" key={book.id}>
          <div>
            <strong>{book.title}</strong>
            <span>{book.author}</span>
          </div>
          <span className="books-list__year">{book.year}</span>
        </li>
      ))}
    </ul>
  );
}
