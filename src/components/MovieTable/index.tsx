import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import MovieRating from "../MovieRating";
import { swapiApiParams } from "../../types/swapiApiParams";
import convertLatinToRomanUtils from "../../utils/convertLatintoRomanUtils";

interface MovieTableProps {
  data: swapiApiParams[];

  handleItemClick: (itemId: number) => void;
  selectedItem: swapiApiParams | null;
}

const MovieTable: React.FC<MovieTableProps> = ({
  data,
  handleItemClick,
  selectedItem,
}) => {



  console.log(data)
  return (
    <TableContainer >
      <Table sx={{ minWidth: 450 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Episode</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="center">Release Date</TableCell>
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
                backgroundColor:
                  row.episode_id === selectedItem?.episode_id
                    ? "#eee"
                    : "inherit",
              }}
            >
              <TableCell align="left">EPISODE {row.episode_id}</TableCell>
              <TableCell align="left">
                Episode {convertLatinToRomanUtils(row.episode_id)} - {row.title}
              </TableCell>
              <TableCell align="left">
                <MovieRating movie={row} />
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
