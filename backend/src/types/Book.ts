export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
};

export type CreateBookInput = Omit<Book, "id">;

export type CreateBookRequestBody = {
  title?: string;
  author?: string;
  year?: number;
};
