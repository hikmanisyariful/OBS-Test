import React from "react";
import { Typography } from "@mui/material";
import TableUser from "./TableUser";

export default function Container() {
  return (
    <div>
      <div>
        <Typography variant="h5" gutterBottom>
          User List
        </Typography>
      </div>
      <div className="bg-blue-500 text-white p-4 rounded-lg">Hello Tailwind!</div>

      <TableUser />
    </div>
  );
}
