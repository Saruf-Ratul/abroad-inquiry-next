import {
    Divider,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
  } from "@mui/material";
  import Iconify from "@/components/Iconify";
  import React from "react";

  
  function NewsfeedSearch() {
    return (
      <>
        <Typography
          mb={1}
          fontWeight="bold"
          fontSize={14}
        >
          Search Topics
        </Typography>
        <TextField
          fullWidth
          size="small"
          // sx={{ p: 2 }}
          // onChange={handleInputChange}
          placeholder="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                <Iconify icon={"weui:search-outlined"} width={24} height={24} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
      </>
    );
  }
  
  export default NewsfeedSearch;
  