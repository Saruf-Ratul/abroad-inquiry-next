/**@module component/pagination */
import { Box, Pagination as Pg } from "@mui/material";
import React from "react";

/**
 * Pagination
 * @memberof module:component/pagination
 * @param {Object} props -The component props.
 * @param {number}  props.page -The page index.
 * @param {Function} props.handleChangePage -Function to handle the paginated pages.
 * @param {number} props.totalItem - Total item.
 * @param {number} props.itemPerPage -Number of item per page.
 * @returns {JSX.Element}
 */
function Pagination({ page, handleChangePage, totalItem, itemPerPage }) {
  const totalCount = Math.ceil(totalItem / itemPerPage);
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Pg
        count={totalCount}
        page={page}
        onChange={handleChangePage}
        variant="outlined"
        shape="rounded"
      />
    </Box>
  );
}

export default Pagination;
