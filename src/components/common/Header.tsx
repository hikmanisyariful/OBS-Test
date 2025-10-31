import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        height: 64,
        width: "100vw",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap>
          OBS Technical Test
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
