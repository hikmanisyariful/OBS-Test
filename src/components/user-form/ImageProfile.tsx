import { useEffect, useState } from "react";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";

type Props = {
  id?: number;
  newId: number;
};

export default function ImageProfile({ id, newId }: Props) {
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setLoading(true);
    if (!id) {
      const newUrl = `https://picsum.photos/id/${newId}/96/96?${Date.now()}`;
      setImgSrc(newUrl);
      setLoading(false);
      return;
    }

    const newUrl = `https://picsum.photos/id/${id}/96/96?${Date.now()}`;
    setImgSrc(newUrl);
    setLoading(false);
  }, [id, newId]);

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ xs: "flex-start", sm: "center" }}
      spacing={3}
      sx={{ mb: 3 }}
    >
      <Box sx={{ position: "relative" }}>
        {loading && <Skeleton variant="circular" width={96} height={96} />}

        <Avatar
          key={id} // <== ini memaksa Avatar di-mount ulang setiap id berubah
          src={imgSrc}
          alt="User avatar"
          sx={{
            width: 96,
            height: 96,
            display: loading ? "none" : "block",
          }}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </Box>
    </Stack>
  );
}
