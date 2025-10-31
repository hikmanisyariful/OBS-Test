import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { useState } from "react";
import { deleteUsersByIds } from "../../redux/reducers/users";
import { showAlert } from "../../redux/reducers/alert";
import { useSelectedUserContextContext } from "../user-list/context/SelectedUserContext";

export default function ModalUserDelete({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const { toggleAll, selected } = useSelectedUserContextContext();

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(deleteUsersByIds(selected));
      setLoading(false);
      dispatch(
        showAlert({
          message: "User successfuly deleted!",
          severity: "success",
          autoHideDuration: 3000,
        })
      );
      toggleAll(false);
      onClose?.();
    }, 1000);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (event: any, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose?.();
  };

  return (
    <Dialog maxWidth="xs" open={open} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Delete selected users?
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This action will delete {selected.length} {selected.length > 1 ? "users" : "user"}.
          Selected {selected.length > 1 ? "users" : "user"} will be permanently deleted. Please make
          sure you want to continue.
        </Typography>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outlined" onClick={onClose} size="small" disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            size="small"
            disabled={loading}
            loading={loading}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
