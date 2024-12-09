import { useState } from "react";
import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { InputAdornment } from "@mui/material";

const SearchBar = ({ onSearch, searchTrigger }) => {
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
        paddingTop={searchTrigger ? 4 : 0}
        display="flex"
        flexDirection={searchTrigger ? "row" : "column"}
        alignItems={searchTrigger ? "flex-start" : "center"}
        justifyContent={searchTrigger ? "space-between" : "center"}
        gap={10}
        marginBottom={2}
        height={searchTrigger ? "auto" : "100%"}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {searchTrigger ? (
            <a href="/">
              <img width={180} src="./logo.svg" alt="logo" />
            </a>
          ) : (
            <img width={180} src="./logo.svg" alt="logo" />
          )}

          <h2
            style={{
              display: searchTrigger ? "none" : "block",
              textAlign: "center",
              fontWeight: "400",
            }}
          >
            Book Search Assignment
          </h2>
        </div>

        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          style={{ maxWidth: searchTrigger ? "323px" : "489px" }}
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
