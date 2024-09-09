"use client";
import Iconify from "@/components/Iconify";
import { TableMoreMenu } from "@/components/table";
import {
  Checkbox,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useState } from "react";

// ----------------------------------------------------------------------
const StyledImage = styled(Image)({
  borderRadius: 4,
  objectFit: "contain",
});

export default function ProgramTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}) {
  const {
    name,
    university,
    country,
    level,
    tuitionFees,
    session,
    deadline,
    logo,
  } = row;

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

      <TableCell>
        {" "}
        <Typography variant="subtitle2" noWrap>
          {name}{" "}
        </Typography>
      </TableCell>

      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <StyledImage
          width={40}
          height={40}
          alt={name}
          src={logo}
          style={{ marginRight: 16 }}
        />

        {university}
      </TableCell>

      <TableCell align="right">{country}</TableCell>

      <TableCell>{level}</TableCell>

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
