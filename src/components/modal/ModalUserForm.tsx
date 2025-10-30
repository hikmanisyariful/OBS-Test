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
  return (
    <Dialog maxWidth="md" open={open} onClose={onClose}>
      <DialogContent>
        <UserForm isEdit={isEdit} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
