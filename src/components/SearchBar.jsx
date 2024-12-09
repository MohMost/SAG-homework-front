import { useState } from "react";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { InputAdornment } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        onSearch(query);
      }
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={10}
        marginBottom={2}
        height={"100vh"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img width={180} src="./logo.svg" alt="logo" />
          <h2 style={{ textAlign: "center", fontWeight: "400" }}>
            Book Search Assignment
          </h2>
        </div>

        <TextField
          label="Search"
          fullWidth
          style={{ maxWidth: "489px" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon style={{ color: "black" }} />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </>
  );
};

export default SearchBar;
