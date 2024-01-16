// MovieTable.tsx

import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import styles from "./home.module.css";
import MovieRating from "../MovieRating";
import { swapiApiParams } from "../../types/swapiApiParams";
import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";

interface MovieTableProps {
  data: swapiApiParams[];
  sortingCriteria: { column: string; order: string };
  handleSort: (column: string) => void;
  handleItemClick: (itemId: number) => void;
  selectedItem: swapiApiParams | null | any;
}

const MovieTable: React.FC<MovieTableProps> = ({ data, sortingCriteria, handleSort, handleItemClick, selectedItem }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" onClick={() => handleSort("episode_id")}>
              Episode
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("title")}>
              Name
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("rate")}>
              Rate
            </TableCell>
            <TableCell align="center" onClick={() => handleSort("release_date")}>
              Release Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.episode_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => handleItemClick(row.episode_id)}
              style={{
                cursor: "pointer",
                backgroundColor: row.episode_id === selectedItem?.episode_id ? "#eee" : "inherit",
              }}
            >
              <TableCell align="left">EPISODE {row.episode_id}</TableCell>
              <TableCell align="left">
                Episode {convertLatinToRomanUtils(row.episode_id)} - {row.title}
              </TableCell>
              <TableCell align="left">
                <MovieRating selectedItem={row} />
              </TableCell>
              <TableCell align="left">{row.release_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
