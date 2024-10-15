/**@module component/Snackbar */
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";



/**
 * Customized snack bars.
 * @memberof module:component/Snackbar
 * @param {Object} props - The component props.
 * @param {string} props.message -The snackbar message.
 * @param {number} props.severity -The snackbar severity.
 * @param {boolean} props.openstate -The snackbar openstate.
 * @param {Function} props.setOpenState -The snackbar setOpenState.
 * @returns {JSX.Element}
 */
export default function CustomizedSnackbars({
  message,
  severity,
  openstate,
  setOpenState,
}) {

  /**
   * function to close the snackbar
   * @param {*} event 
   * @param {*} reason 
   * @returns {void}
   */
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenState(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={openstate} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
