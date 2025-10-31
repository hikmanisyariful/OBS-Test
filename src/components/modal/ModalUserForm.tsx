import { Dialog, DialogContent } from "@mui/material";
import { UserForm } from "../user-form";

export default function ModalUserForm({
  open,
  onClose,
  isEdit = false,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  isEdit?: boolean;
  userId?: number;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (event: any, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    onClose?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "90%", // mobile
              sm: "80%", // tablet
              md: 720, // desktop fixed width
            },
            m: "auto",
          },
          elevation: 1,
        },
      }}
    >
      <DialogContent>
        <UserForm isEdit={isEdit} onClose={onClose} userId={userId} />
      </DialogContent>
    </Dialog>
  );
}
