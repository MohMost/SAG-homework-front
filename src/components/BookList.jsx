import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
const BookList = ({
  books = [],
  loading,

  error,
  page,
  rowsPerPage,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
  onSortedBooksChange,
}) => {
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    if (loading) {
      setSortOption("default");
    }
  }, [loading]);

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);
    sortBooks(books, newSortOption);
  };

  const sortBooks = (books, option) => {
    let sortedArray = [...books];

    switch (option) {
      case "oldest":
        sortedArray.sort((a, b) => a.first_publish_year - b.first_publish_year);
        break;
      case "newest":
        sortedArray.sort((a, b) => b.first_publish_year - a.first_publish_year);
        break;
      default:
        break;
    }

    onSortedBooksChange(sortedArray);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {error}
      </div>
    );
  }

  if (books.length > 0) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <FormControl variant="outlined" sx={{ width: "200px" }}>
            <InputLabel>Sort</InputLabel>
            <Select label="Sort" value={sortOption} onChange={handleSortChange}>
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="col">Title</TableCell>
              <TableCell scope="col">Author</TableCell>
              <TableCell scope="col">Publish year</TableCell>
              <TableCell scope="col">Rating</TableCell>
              <TableCell scope="col">First sentence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage !== null
              ? books.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : books
            ).map((book) => (
              <TableRow key={book.key}>
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  {(book.author_name || []).join(", ")}
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  {book.first_publish_year}
                </TableCell>
                <TableCell style={{ width: 160 }}>
                  {typeof book.ratings_average === "number"
                    ? book.ratings_average.toFixed(2)
                    : "N/A"}
                </TableCell>

                <TableCell style={{ width: 160 }}>
                  <Tooltip
                    title={
                      <span style={{ whiteSpace: "pre-line" }}>
                        {book.first_sentence && book.first_sentence.length > 0
                          ? book.first_sentence[0]
                          : "No sentence available"}
                      </span>
                    }
                  >
                    <span>
                      {book.first_sentence && book.first_sentence.length > 0
                        ? book.first_sentence[0]
                            .split(" ")
                            .slice(0, 3)
                            .join(" ") + "..."
                        : "N/A"}
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          books={books}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </>
    );
  }

  return null; // Default fallback
};

export default BookList;
