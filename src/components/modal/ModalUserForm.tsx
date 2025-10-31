import { Dialog, DialogContent } from "@mui/material";
import { UserForm } from "../user-form";

export default function ModalUserForm({
  open,
  onClose,
  isEdit = false,
}: {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (event: any, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose?.();
  };

  return (
    <Dialog maxWidth="md" open={open} onClose={handleClose}>
      <DialogContent>
        <UserForm isEdit={isEdit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
