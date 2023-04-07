import Typography from "@mui/material/Typography";

type Props = {
  shown: number;
  total: number;
};

export const SearchInfo = (props: Props) => (
  <Typography variant="body1">
    Showing {props.shown} results of {props.total}
  </Typography>
);
