import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  open: boolean;
};

export const Loader = (props: Props) => (
  <Backdrop
    sx={{ color: "black", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={props.open}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);
