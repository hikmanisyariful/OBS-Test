import { useState } from "react";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Toolbar,
  Skeleton,
} from "@mui/material";
import Action from "./Action";
import { ModalUserDelete, ModalUserForm } from "../modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchState } from "../../interfaces/Fetch";
import { useSelectedUserContextContext } from "./context/SelectedUserContext";
import { setIsEditForm } from "../../redux/reducers/userForm";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  company?: { name: string };
}

function Profile({ user }: { user: User }) {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Avatar alt={user.name} src={`https://picsum.photos/id/${user.id}/80/80`} />
      <Box>
        <Typography variant="subtitle2">{user.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          @{user.username}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TableUser() {
  const dispatch = useAppDispatch();
  const usersState = useAppSelector((state) => state.users);
  const userFormState = useAppSelector((state) => state.userForm);

  const { selected, isAllSelected, isIndeterminate, toggleAll, toggleOne, isSelected, focusRow } =
    useSelectedUserContextContext();

  const [openModalUserForm, setOpenModalUserForm] = useState(false);
  const [openModalConfirmDelete, setOpenModalConfirmDelete] = useState(false);

  const handleEdit = (id: number) => {
    setOpenModalUserForm(true);
    console.log("edit", id);
    dispatch(setIsEditForm(true));
  };
  const handleDelete = (id: number) => {
    console.log("delete", id);
    setOpenModalConfirmDelete(true);
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

      <Box sx={{ width: "100vw", px: { xs: 1, sm: 2, md: 4 }, pt: 1, pb: 3 }}>
        <Toolbar
          data-testid="table-user-toolbar"
          disableGutters
          sx={{
            mb: 1.5,
            minHeight: 48,
            color: selected.length ? "primary.main" : "inherit",
          }}
        >
          <Typography variant="body1">
            {selected.length ? `${selected.length} selected` : "Users"}
          </Typography>
        </Toolbar>

        <TableContainer
          component={Paper}
          sx={{ width: "100%", overflowX: "auto", borderRadius: 2 }}
        >
          <Table sx={{ minWidth: 800 }} size="small" aria-label="responsive selectable table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={isIndeterminate}
                    checked={isAllSelected}
                    onChange={(e) => toggleAll(e.target.checked)}
                    slotProps={{
                      input: {
                        "aria-label": "select all users",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Company</TableCell>
                <TableCell padding="checkbox" align="right" />
              </TableRow>
            </TableHead>

            <TableBody>
              {usersState.status === FetchState.LOADING ? <Skeleton /> : null}
              {usersState.status === FetchState.SUCCESS &&
                usersState.userList.map((user) => {
                  const checked = isSelected(user.id);
                  return (
                    <TableRow
                      key={user.id}
                      hover
                      role="checkbox"
                      aria-checked={checked}
                      selected={checked}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={checked}
                          onChange={() => toggleOne(user.id)}
                          slotProps={{
                            input: {
                              "aria-label": `select user ${user.id}`,
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell>{user.id}</TableCell>

                      <TableCell>
                        <Profile user={user} />
                      </TableCell>

                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address.street ?? "-"}</TableCell>
                      <TableCell>{user.website ?? "-"}</TableCell>
                      <TableCell>{user.company?.name ?? "-"}</TableCell>

                      <TableCell padding="checkbox" align="right">
                        <Action
                          rowId={user.id}
                          onFocusRow={focusRow}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
