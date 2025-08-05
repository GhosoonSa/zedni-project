import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ value, onChange, placeholder = "ابحث..." }) => {
  return (
    <>
      <Box sx={{ mb: 3, width: "300px" }}>
        <TextField
          color="warning"
          fullWidth
          variant="outlined"
          label={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{ direction: "ltr" }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </>
  );
};

export default Search;
