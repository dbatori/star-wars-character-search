import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Character } from "../api";

type Props = {
  results: Character[];
  total: number;
  loading: boolean;
  loadMore(): Promise<void>;
};

export const Cards = (props: Props) => (
  <>
    <Box display="flex" flexWrap="wrap" gap={2} py={1}>
      {props.results.map(({ name }, idx) => (
        <Card key={name} sx={{ padding: 2, width: "100%", maxWidth: 250 }}>
          <CardMedia
            sx={{ height: "75vw", maxHeight: 250, backgroundSize: "contain" }}
            image={idx % 2 === 0 ? "/mock-image-1.png" : "/mock-image.png"}
            title={name}
          />
          <Typography variant="body2" textAlign="center">
            {name}
          </Typography>
        </Card>
      ))}
    </Box>
    {props.results.length < props.total && (
      <Button
        variant="outlined"
        disabled={props.loading}
        onClick={props.loadMore}
      >
        Load More
      </Button>
    )}
  </>
);
