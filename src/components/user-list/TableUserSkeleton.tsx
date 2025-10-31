import { TableRow, TableCell, Checkbox, Skeleton } from "@mui/material";

type UserTableSkeletonProps = {
  rows?: number; // default: 5
};

export default function UserTableSkeleton({ rows = 5 }: UserTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} hover>
          {/* Checkbox */}
          <TableCell padding="checkbox">
            <Checkbox color="primary" disabled />
          </TableCell>

          {/* ID */}
          <TableCell width="5%">
            <Skeleton variant="text" width="60%" />
          </TableCell>

          {/* Profile */}
          <TableCell width="20%">
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              sx={{ display: "inline-block", mr: 1 }}
            />
            <Skeleton variant="text" width="60%" sx={{ display: "inline-block" }} />
          </TableCell>

          {/* Email */}
          <TableCell width="15%">
            <Skeleton variant="text" width="80%" />
          </TableCell>

          {/* Phone */}
          <TableCell width="15%">
            <Skeleton variant="text" width="70%" />
          </TableCell>

          {/* Address */}
          <TableCell width="15%">
            <Skeleton variant="text" width="90%" />
          </TableCell>

          {/* Website */}
          <TableCell width="10%">
            <Skeleton variant="text" width="70%" />
          </TableCell>

          {/* Company */}
          <TableCell width="15%">
            <Skeleton variant="text" width="80%" />
          </TableCell>

          {/* Actions */}
          <TableCell padding="checkbox" align="right" width="5%">
            <Skeleton variant="rounded" width="70%" height={30} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
