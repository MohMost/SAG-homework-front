import { useState } from "react";
import SearchBar from "./components/SearchBar";
/*import BookList from "./components/BookList";
import Pagination from "./components/Pagination";*/

import BookList from "./components/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchBooks = async (searchQuery) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://sag-assignment-back.onrender.com/search?q=${searchQuery}`
      );
      const data = await response.json();
      if (!data.docs.length) {
        setError("No books found!");
        setBooks([]);
      } else {
        setBooks(data.docs || []);
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ height: "80%" }}>
      <SearchBar
        onSearch={(q) => {
          fetchBooks(q);
        }}
      />

      <BookList
        error={error}
        books={books}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        emptyRows={emptyRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Home;
