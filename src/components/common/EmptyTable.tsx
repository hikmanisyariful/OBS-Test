import { Box, Typography } from "@mui/material";

type Props = {
  image: string;
  title: string;
  description: string;
};

const EmptyTable = ({ image, title, description }: Props) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="100%"
      gap={2}
      sx={{
        textAlign: "center",
        py: 4,
        width: "100%",
        maxWidth: "100%",
        mx: "auto",
      }}
    >
      <img src={image} width={128} height={128} alt="empty-table" />
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1" width="50%">
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyTable;
