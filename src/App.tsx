import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Cards,
  Error,
  Loader,
  SearchForm,
  SearchInfo,
  Sorter,
  sort,
  SortBy,
} from "./components";
import Box from "@mui/material/Box";
import { useCharacters } from "./api";
import { useState } from "react";

export default function App() {
  const { count, results, search, loadMore, loading, error, resetError } =
    useCharacters();
  const [sortBy, setSortBy] = useState<SortBy>("Do not sort");

  return (
    <>
      <CssBaseline />
      <AppBar />
      <Box component="main" display="flex" flexDirection="column" gap={2} p={2}>
        <SearchForm disabled={loading} onSubmit={search} />
        <SearchInfo shown={results.length} total={count} />
        <Sorter sortBy={sortBy} disabled={loading} onSort={setSortBy} />
        <Cards
          results={sort(results, sortBy)}
          total={count}
          loading={loading}
          loadMore={loadMore}
        />
      </Box>
      <Error open={error} onClose={resetError} />
      <Loader open={loading} />
    </>
  );
}
