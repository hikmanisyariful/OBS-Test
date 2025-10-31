import React, { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import UserDetail from "../user-list/UserDetail";
import { useSelectedUserContextContext } from "../user-list/context/SelectedUserContext";
import { useAppSelector } from "../../redux/hooks";
import { UserForm } from "../user-form";

export default function ModalUserDetail({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toggleAll } = useSelectedUserContextContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClose = (event: any, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    toggleAll(false);
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
        <ModalContent
          onClose={() => {
            toggleAll(false);
            onClose?.();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

const ModalContent = ({ onClose }: { onClose: VoidFunction }) => {
  const usersState = useAppSelector((state) => state.users);
  const { selected } = useSelectedUserContextContext();
  const [isEdit, setIsEdit] = useState(false);

  const detailUser = useMemo(() => {
    if (selected.length < 1) return;
    return usersState.userList?.find((user) => user.id === selected[0]);
  }, [usersState.userList, selected]);

  const handleSwitchForm = (val: boolean) => {
    setIsEdit(val);
  };

  return (
    <>
      {isEdit ? (
        <UserForm isEdit onClose={() => handleSwitchForm(false)} userId={detailUser?.id} />
      ) : detailUser ? (
        <UserDetail user={detailUser} onEdit={() => handleSwitchForm(true)} onClose={onClose} />
      ) : null}
    </>
  );
};
