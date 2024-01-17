import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MovieRating from "../MovieRating";
import { swapiApiParams } from "../../types/swapiApiParams";

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
  return (
    <TableContainer>
      <Table sx={{ minWidth: "450px" }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ minWidth: "70px", textAlign: "left", fontSize: "0.9rem" }}
            >
              Episode
            </TableCell>
            <TableCell sx={{ textAlign: "left", fontSize: "0.9rem" }}>
              Name
            </TableCell>
            <TableCell sx={{ textAlign: "left", fontSize: "0.9rem" }}>
              Rate
            </TableCell>
            <TableCell sx={{ textAlign: "left", fontSize: "0.9rem" }}>
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
                backgroundColor:
                  row.episode_id === selectedItem?.episode_id
                    ? "#eee"
                    : "inherit",
              }}
            >
              <TableCell sx={{ textAlign: "left", fontSize: "0.8rem" }}>
                EPISODE {row.episode_id}
              </TableCell>
              <TableCell sx={{ textAlign: "left", fontSize: "0.8rem" }}>
                Episode {row.fullName}
              </TableCell>
              <TableCell>
                <MovieRating movie={row} />
              </TableCell>
              <TableCell sx={{ textAlign: "left", fontSize: "0.8rem" }}>
                {row.release_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
