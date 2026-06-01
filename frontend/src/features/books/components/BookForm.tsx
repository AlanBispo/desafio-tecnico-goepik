import { FormEvent, useState } from "react";

import { CreateBookInput } from "../types/book";

type BookFormProps = {
  isSubmitting: boolean;
  onSubmit: (book: CreateBookInput) => Promise<boolean>;
};

export function BookForm({ isSubmitting, onSubmit }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const wasCreated = await onSubmit({
      title: title.trim(),
      author: author.trim(),
      year: Number(year),
    });

    if (wasCreated) {
      setTitle("");
      setAuthor("");
      setYear("");
    }
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <div className="book-form__field">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          minLength={1}
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ex: Dom Casmurro"
          required
          type="text"
          value={title}
        />
      </div>

      <div className="book-form__field">
        <label htmlFor="author">Autor</label>
        <input
          id="author"
          minLength={1}
          name="author"
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="Ex: Machado de Assis"
          required
          type="text"
          value={author}
        />
      </div>

      <div className="book-form__field">
        <label htmlFor="year">Ano</label>
        <input
          id="year"
          min={1}
          name="year"
          onChange={(event) => setYear(event.target.value)}
          placeholder="Ex: 1899"
          required
          type="number"
          value={year}
        />
      </div>

      <button className="book-form__button" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Cadastrando..." : "Cadastrar livro"}
      </button>
    </form>
  );
}
