import * as React from "react";
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
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Action from "./Action";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  company?: { name: string };
}

const users: User[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    phone: "1-770-736-8031",
    website: "hildegard.org",
    company: { name: "Romaguera-Crona" },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593",
    website: "anastasia.net",
    company: { name: "Deckow-Crist" },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: { name: "Romaguera-Jacobson" },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    phone: "493-170-9623",
    website: "kale.biz",
    company: { name: "Robel-Corkery" },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
    company: { name: "Keebler LLC" },
  },
];

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
  // daftar id yang terpilih
  const [selected, setSelected] = React.useState<number[]>([]);

  const allIds = React.useMemo(() => users.map((u) => u.id), []);
  const isAllSelected = selected.length === users.length && users.length > 0;
  const isIndeterminate = selected.length > 0 && selected.length < users.length;

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? allIds : []);
  };

  const toggleOne = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const isSelected = (id: number) => selected.includes(id);

  // fokuskan selection ke baris ini saja
  const focusRow = (id: number) => setSelected([id]);
  const handleEdit = (id: number) => {
    // aksi edit…
    console.log("edit", id);
  };
  const handleDelete = (id: number) => {
    // aksi delete…
    console.log("delete", id);
  };

  return (
    <Box sx={{ width: "100vw", px: { xs: 1, sm: 2, md: 4 }, py: 3 }}>
      {/* Toolbar sederhana yang menampilkan jumlah pilihan */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row justify-end gap-2">
        {selected.length > 0 ? (
          <Button
            id="delete-selection-button"
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => {}}
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
          onClick={() => {}}
          className="order-1 sm:order-2"
        >
          Add New User
        </Button>
      </div>

      <Toolbar
        data-testid="table-user-toolbar"
        disableGutters
        sx={{
          mb: 1.5,
          minHeight: 48,
          color: selected.length ? "primary.main" : "inherit",
        }}
      >
        <Typography variant="subtitle2">
          {selected.length ? `${selected.length} selected` : "Users"}
        </Typography>
      </Toolbar>

      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto", borderRadius: 2 }}>
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
            {users.map((user) => {
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

                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone ?? "-"}</TableCell>
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
  );
}
