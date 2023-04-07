import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Character } from "../api";

export type SortBy = keyof typeof sortFns;

export function sort(results: Character[], by: SortBy): Character[] {
  if (by === "Do not sort") return results;
  return [...results].sort(sortFns[by]);
}

type Props = {
  sortBy: SortBy;
  disabled: boolean;
  onSort(by: SortBy): void;
};

export const Sorter = (props: Props) => (
  <Select
    value={props.sortBy}
    onChange={(e) => props.onSort(e.target.value as SortBy)}
    disabled={props.disabled}
    displayEmpty
    sx={{ maxWidth: 150 }}
    size="small"
  >
    {Object.keys(sortFns).map((sb, idx) => (
      <MenuItem key={sb} value={sb}>
        {idx === 0 ? <em>{sb}</em> : sb}
      </MenuItem>
    ))}
  </Select>
);

function compareAZ(a: Character, b: Character) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

const compareZA = (a: Character, b: Character) => compareAZ(b, a);

const genderFirstAZ =
  (gender: Character["gender"]) => (a: Character, b: Character) => {
    if (a.gender === gender) {
      if (b.gender === gender) return compareAZ(a, b);
      return -1;
    } else if (b.gender === gender) return 1;
    else return compareAZ(a, b);
  };

const sortFns = {
  "Do not sort": null,
  "A-Z": compareAZ,
  "Z-A": compareZA,
  Male: genderFirstAZ("male"),
  Female: genderFirstAZ("female"),
};
