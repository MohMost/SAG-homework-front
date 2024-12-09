import { TablePagination } from "@mui/material";
const Pagination = ({
  books,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  rowsPerPage,
}) => {
  return (
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
  );
};

export default Pagination;
