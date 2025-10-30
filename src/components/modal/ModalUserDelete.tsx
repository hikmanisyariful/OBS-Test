import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import React from "react";

export default function ModalUserDelete({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog maxWidth="xs" open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Delete selected users?
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          This action will delete 3 users. Selected users will be permanently deleted. Please make sure you want to continue. 
        </Typography>
        <div className="flex justify-end gap-2 mt-5">
          <Button variant="outlined" onClick={onClose} size="small">
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onClose} size="small">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
