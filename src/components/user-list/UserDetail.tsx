import { Box, Typography, Divider, Stack, Button, IconButton, Tooltip } from "@mui/material";
import { User } from "../../interfaces/User";
import ImageProfile from "../user-form/ImageProfile";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const PrintInfo = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="grid grid-cols-12 gap-4 w-full">
      <div className="col-span-4">
        <strong>{title}</strong>
      </div>
      <div className="">:</div>
      <div className="col-span-7">{value}</div>
    </div>
  );
};

export default function UserDetail({
  user,
  onEdit,
  onClose,
}: {
  user: User;
  onEdit: VoidFunction;
  onClose: VoidFunction;
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 3,
      }}
    >
      <Tooltip title="Close">
        <IconButton
          onClick={onClose}
          color="inherit"
          size="small"
          sx={{
            position: "absolute",
            right: 18,
            top: 16,
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </Tooltip>

      <div className="w-full flex justify-center">
        <Typography variant="h5" gutterBottom>
          Info Detail User
        </Typography>
      </div>

      <ImageProfile id={user.id} newId={1} />

      <Button
        size="small"
        variant="outlined"
        color="warning"
        onClick={onEdit}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>

      <Divider flexItem />

      {/* Info */}
      <Stack spacing={1.5} divider={<Divider flexItem />}>
        <PrintInfo title="Name" value={user.name} />
        <PrintInfo title="Username" value={user.username} />
        <PrintInfo title="Email" value={user.email} />
        <PrintInfo title="Phone" value={user?.phone ?? "-"} />
        <PrintInfo title="Address" value={user?.address?.street ?? "-"} />
        <PrintInfo title="Website" value={user?.website ?? "-"} />
        <PrintInfo title="Company" value={user?.company?.name ?? "-"} />
      </Stack>
    </Box>
  );
}
