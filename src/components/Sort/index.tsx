import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";

interface SortProps {
  onSort: (column: string) => void;
}

export default function Sort({ onSort }: SortProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortClick = (column: string) => {
    onSort(column);
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
        sx={{width:'140px', height:'55px'}}
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
      >
        <MenuItem onClick={() => handleSortClick("release_date")}>
          Sort by date
        </MenuItem>
        <MenuItem onClick={() => handleSortClick("episode_id")}>
          Sort by episode
        </MenuItem>
        <MenuItem onClick={() => handleSortClick("rate")}>
          Sort by rate
        </MenuItem>
      </Menu>
    </Box>
  );
}
