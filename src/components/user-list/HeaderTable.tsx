import { useState } from "react";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSelectedUserContextContext } from "./context/SelectedUserContext";
import { ModalUserDelete, ModalUserForm } from "../modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setIsEditForm } from "../../redux/reducers/userForm";

export default function HeaderTable() {
  const dispatch = useAppDispatch();
  const userFormState = useAppSelector((state) => state.userForm);

  const { selected, toggleAll } = useSelectedUserContextContext();
  const [openModalUserForm, setOpenModalUserForm] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);

  const onHandleDelete = () => {
    setOpenModalConfirmDelete(true);
  };

  const onHandleAdd = () => {
    dispatch(setIsEditForm(false));
    setOpenModalUserForm(true);
    toggleAll(false);
  };

  return (
    <>
      <ModalUserForm
        open={openModalUserForm}
        onClose={() => setOpenModalUserForm(false)}
        isEdit={userFormState.isEdit}
      />
      <ModalUserDelete
        open={openModalConfirmDelete}
        onClose={() => setOpenModalConfirmDelete(false)}
      />

      <Box sx={{ width: "100vw", px: { xs: 1, sm: 2, md: 4 }, pt: 3, pb: 1 }}>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end gap-2">
          {selected.length > 0 ? (
            <Button
              id="delete-selection-button"
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onHandleDelete}
              disabled={selected.length === 0}
              className="order-2 sm:order-1"
            >
              Delete {selected.length} {selected.length === 1 ? "user" : "users"}
            </Button>
          ) : null}

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={onHandleAdd}
            className="order-1 sm:order-2"
          >
            Add New User
          </Button>
        </div>
      </Box>
    </>
  );
}
