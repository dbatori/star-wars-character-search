import Typography from "@mui/material/Typography";
import MUIAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const AppBar = () => (
  <MUIAppBar position="sticky">
    <Toolbar>
      <Typography
        variant="h6"
        sx={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        Star Wars Character Search
      </Typography>
    </Toolbar>
  </MUIAppBar>
);
