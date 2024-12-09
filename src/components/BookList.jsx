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

const BookList = ({
  books = [],
  loading,
  error,
  page,
  rowsPerPage,
  emptyRows,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
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
        <p
          style={{
            textAlign: "center",
            color: "#AEAEAE",
          }}
        >
          {error}
        </p>
      </div>
    );
  }

  if (loading && books.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#AEAEAE",
          }}
        >
          <span>No books found!</span> <br />
          <span>Please try again</span>
        </p>
      </div>
    );
  }

  if (books.length > 0) {
    return (
      <>
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
