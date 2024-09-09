"use client";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton,
} from "@/components/table";
import useTable, { emptyRows, getComparator } from "@/hooks/useTable";
import {
  Box,
  Card,
  Container,
  FormControlLabel,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import UniversityTableRow from "./UniversityTableRow";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "University Name", align: "left" },
  { id: "country", label: "Country", align: "left" },
  { id: "state", label: "State", align: "left" },
  { id: "tuitionFees", label: "Tuition Fees", align: "right" },
  { id: "session", label: "Session", align: "center", width: 180 },
  { id: "deadline", label: "Deadline", align: "right" },
  { id: "" },
];

// Dummy data for universities
const dummyData = [
  {
    id: "1",
    name: "Harvard University",
    country: "USA",
    state: "Massachusetts",
    tuitionFees: "$50,000",
    session: "Fall 2024",
    deadline: "December 1, 2023",
    logo: "https://www.abroadinquiry.com/static/media/logo-square.11443f6ed37ed58a3afe.webp",
  },
  {
    id: "2",
    name: "University of Oxford",
    country: "UK",
    state: "Oxfordshire",
    tuitionFees: "£40,000",
    session: "Fall 2024",
    deadline: "January 15, 2024",
    logo: "https://www.abroadinquiry.com/static/media/logo-square.11443f6ed37ed58a3afe.webp",
  },
  {
    id: "3",
    name: "University of Toronto",
    country: "Canada",
    state: "Ontario",
    tuitionFees: "CAD 45,000",
    session: "Fall 2024",
    deadline: "February 1, 2024",
    logo: "https://www.abroadinquiry.com/static/media/logo-square.11443f6ed37ed58a3afe.webp",
  },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UniversityList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: "name",
  });

  // const { push } = useRouter();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    setTableData(dummyData);
  }, []);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    // push(PATH_DASHBOARD.university.edit(paramCase(id)));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound =
    (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  return (
    <Container maxWidth={"lg"}>
      <Card>
        {/* <UniversityTableToolbar
              filterName={filterName}
              onFilterName={handleFilterName}
            /> */}

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
                actions={
                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={() => handleDeleteRows(selected)}
                    >
                      <Iconify icon={"eva:trash-2-outline"} />
                    </IconButton>
                  </Tooltip>
                }
              />
            )}

            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) =>
                    row ? (
                      <UniversityTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ) : (
                      !isNotFound && (
                        <TableSkeleton
                          key={row.id}
                          sx={{ height: denseHeight }}
                        />
                      )
                    )
                  )}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Box sx={{ position: "relative" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={onChangeDense} />}
            label="Dense"
            sx={{ px: 3, py: 1.5, top: 0, position: { md: "absolute" } }}
          />
        </Box>
      </Card>
    </Container>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) =>
      item.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  return tableData;
}
