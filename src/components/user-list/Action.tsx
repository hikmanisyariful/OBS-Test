import { useState, MouseEvent } from "react";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  rowId: number;
  onFocusRow: (id: number) => void; // set selected = [id]
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
};

const Action = ({ rowId, onFocusRow, onEdit, onDelete }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // jangan trigger select row/checkbox
    onFocusRow(rowId); // fokuskan selection ke baris ini saja
    setAnchorEl(e.currentTarget); // lalu buka menu
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    onEdit?.(rowId);
    handleClose();
  };

  const handleDelete = () => {
    onDelete?.(rowId);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Actions">
        <IconButton aria-label="actions" onClick={handleOpen}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Action;
