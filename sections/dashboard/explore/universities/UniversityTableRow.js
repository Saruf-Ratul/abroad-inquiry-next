import Iconify from "@/components/Iconify";
import { TableMoreMenu } from "@/components/table";
import {
  Checkbox,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useState } from "react";

// ----------------------------------------------------------------------
const MuiImage = styled(Image)(({ theme }) => ({}));

export default function UniversityTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}) {
  const theme = useTheme();

  const { name, country, state, tuitionFees, session, deadline, logo } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <MuiImage
          width={100}
          height={100}
          disabledEffect
          alt={name}
          src={logo}
          sx={{
            borderRadius: 1,
            width: 48,
            height: 48,
            mr: 2,
            objectFit: "contain",
          }}
        />
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell>{country}</TableCell>

      <TableCell>{state}</TableCell>

      <TableCell align="right">{tuitionFees}</TableCell>

      <TableCell align="center">{session}</TableCell>

      <TableCell align="right">{deadline}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
