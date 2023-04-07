import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type Props = {
  open: boolean;
  onClose(): void;
};

export const Error = (props: Props) => (
  <Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose}>
    <Alert severity="error" onClose={props.onClose} sx={{ width: "100%" }}>
      Something went wrong, please try again!
    </Alert>
  </Snackbar>
);
