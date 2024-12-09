import * as React from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Tooltip,
} from "@mui/material";

export default function CustomPaginationActionsTable({ books, loading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  if (loading)
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
  if (!books.length)
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
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Publish year</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>First sentence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage !== null
            ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    book.first_sentence && book.first_sentence.length > 0
                      ? book.first_sentence[0]
                      : "No sentence available"
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
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25]}
        count={books !== null ? 13 : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        slotProps={{
          select: {
            inputProps: {
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}