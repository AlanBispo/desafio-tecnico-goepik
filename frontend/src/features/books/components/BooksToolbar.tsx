type SortOrder = "asc" | "desc";

type BooksToolbarProps = {
  searchTerm: string;
  sortOrder: SortOrder;
  onSearchTermChange: (searchTerm: string) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
};

export function BooksToolbar({
  searchTerm,
  sortOrder,
  onSearchTermChange,
  onSortOrderChange,
}: BooksToolbarProps) {
  return (
    <div className="books-toolbar">
      <div className="books-toolbar__field">
        <label htmlFor="book-search">Buscar por título</label>
        <input
          id="book-search"
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Digite o título"
          type="search"
          value={searchTerm}
        />
      </div>

      <div className="books-toolbar__field">
        <label htmlFor="book-sort">Ordenar por ano</label>
        <select
          id="book-sort"
          onChange={(event) =>
            onSortOrderChange(event.target.value as SortOrder)
          }
          value={sortOrder}
        >
          <option value="asc">Ano crescente</option>
          <option value="desc">Ano decrescente</option>
        </select>
      </div>
    </div>
  );
}
