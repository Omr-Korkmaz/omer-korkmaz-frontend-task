import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface SortProps {
  onSort: (column: string, order: string) => void;
  sortingCriteria: { column: string; order: string };
}

export default function Sort({ onSort, sortingCriteria }: SortProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortClick = (column: string) => {
    const order =
      sortingCriteria.column === column && sortingCriteria.order === "asc"
        ? "desc"
        : "asc";
    onSort(column, order);
    handleClose();
  };

  return (
    <Box>
      <Button
        variant="outlined"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          width: "max-content",
          padding: " 0 30px",
          height: "55px",
          border: "1px solid gray",
          color: "gray",
        }}
      >
        Sort by...
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ width: "300px" }}
      >
        <MenuItem
          onClick={() => handleSortClick("release_date")}
          sx={{ width: "130px" }}
        >
          Date{" "}
          {sortingCriteria.column === "release_date" && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              {sortingCriteria.order === "asc" ? (
                <ArrowDropUpIcon sx={{ fontSize: "40px" }} />
              ) : (
                <ArrowDropDownIcon sx={{ fontSize: "40px" }} />
              )}
            </Typography>
          )}
        </MenuItem>
        <MenuItem onClick={() => handleSortClick("episode_id")}>
          Episode{" "}
          {sortingCriteria.column === "episode_id" && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              {sortingCriteria.order === "asc" ? (
                <ArrowDropUpIcon sx={{ fontSize: "40px" }} />
              ) : (
                <ArrowDropDownIcon sx={{ fontSize: "40px" }} />
              )}
            </Typography>
          )}
        </MenuItem>
      </Menu>
    </Box>
  );
}
