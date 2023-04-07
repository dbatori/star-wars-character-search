import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormEvent, useState } from "react";

type Props = {
  disabled: boolean;
  onSubmit(searchVal: string): void;
};

export function SearchForm(props: Props) {
  const [searchVal, setSearchVal] = useState("");

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(searchVal);
  };

  return (
    <Box
      component="form"
      onSubmit={onSearch}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <TextField
        type="search"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        disabled={props.disabled}
        label="Search Character"
        variant="standard"
        sx={{ width: "100%", maxWidth: 300 }}
      />
      <Button type="submit" disabled={props.disabled} variant="outlined">
        Search Character
      </Button>
    </Box>
  );
}
