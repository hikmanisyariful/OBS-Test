import { Avatar, Box, Button, Skeleton, Stack } from "@mui/material";

type Props = {
  avatarUrl: string | undefined;
  onReset: () => void;
  onChange: (newAvatarUrl: string) => void;
};

export default function ImageProfile({ avatarUrl, onReset, onChange }: Props) {
  const handleChangeAvatar = () => {
    const newAvatarUrl = "";
    onChange(newAvatarUrl);
  };

  const isLoading = false;

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={3}
      sx={{ mb: 3 }}
    >
      <Box sx={{ position: "relative" }}>
        {!isLoading ? (
          <Avatar src={avatarUrl} alt="User avatar" sx={{ width: 96, height: 96 }} />
        ) : (
          <Skeleton variant="circular" width={96} height={96} />
        )}
      </Box>

      <div className="flex flex-col items-start gap-1 justify-start h-[96px] gap-2">
        <Button variant="contained" onClick={handleChangeAvatar} disabled={isLoading}>
          Change Avatar
        </Button>
        <Button
          variant="text"
          color="error"
          onClick={onReset}
          disabled={isLoading}
          sx={{ textAlign: "start" }}
        >
          Reset
        </Button>
      </div>
    </Stack>
  );
}
