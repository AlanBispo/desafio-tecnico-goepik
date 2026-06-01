import { BookForm } from "./BookForm";
import { CreateBookInput } from "../types/book";

type BookModalProps = {
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (book: CreateBookInput) => Promise<boolean>;
};

export function BookModal({ isSubmitting, onClose, onSubmit }: BookModalProps) {
  return (
    <div className="book-modal" role="presentation">
      <div
        aria-labelledby="book-modal-title"
        aria-modal="true"
        className="book-modal__content"
        role="dialog"
      >
        <div className="book-modal__header">
          <h2 id="book-modal-title">Cadastrar livro</h2>
          <button
            aria-label="Fechar modal"
            className="book-modal__close"
            disabled={isSubmitting}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>

        <BookForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
