import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Character } from "../api";

type Props = {
  results: Character[];
  total: number;
  loading: boolean;
  loadMore(): Promise<void>;
};

export const Cards = (props: Props) => (
  <>
    <Grid container spacing={2}>
      {props.results.map(({ name }, idx) => (
        <Grid key={name} item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 3,
            }}
          >
            <CardMedia
              sx={{ height: 250, backgroundSize: "contain" }}
              image={idx % 2 === 0 ? "/mock-image-1.png" : "/mock-image.png"}
              title={name}
            />
            <Typography variant="body2" textAlign="center">
              {name}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
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
