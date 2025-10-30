import { Avatar, Box, Skeleton, Stack } from "@mui/material";

type Props = {
  avatarUrl: string | undefined;
  onReset?: () => void;
  onChange?: (newAvatarUrl: string) => void;
};

export default function ImageProfile({ avatarUrl }: Props) {
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
    </Stack>
  );
}
