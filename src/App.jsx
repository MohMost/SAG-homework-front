import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [error, setError] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchBooks = async (searchQuery) => {
    setSearchTrigger(true);
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/search?q=${searchQuery}`
      );
      const data = await response.json();
      if (!data.docs.length) {
        setError(
          <p
            style={{
              textAlign: "center",
              color: "#AEAEAE",
            }}
          >
            <span>No books found!</span> <br />
            <span>Please try again</span>
          </p>
        );
        setBooks([]);
        setSortedBooks([]);
      } else {
        setBooks(data.docs || []);
        setSortedBooks(data.docs || []);
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.", err);
      setBooks([]);
      setSortedBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sortedBooks.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortedBooksChange = (sortedArray) => {
    setSortedBooks(sortedArray);
  };

  return (
    <div style={{ height: "80%" }}>
      <SearchBar
        searchTrigger={searchTrigger}
        onSearch={(q) => {
          fetchBooks(q);
        }}
      />

      <BookList
        error={error}
        sortedBooks={sortedBooks}
        books={books}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        emptyRows={emptyRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        onSortedBooksChange={handleSortedBooksChange}
      />
    </div>
  );
};

export default Home;
