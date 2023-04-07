import { loader, List } from "./loader";

const url = "https://swapi.dev/api";

export type Character = {
  name: string;
  gender: "male" | "female" | "n/a";
};

type PeopleList = List<Character>;

export const useCharacters = loader({
  fetch: fetchPeopleList,
  search: searchPeopleList,
  initSearchVal: "",
});

async function fetchPeopleList(url: string): Promise<PeopleList> {
  try {
    return extractPeopleList(await get(url));
  } catch (e) {
    throw new Error("Can't GET people list");
  }
}

function searchPeopleList(name: string): Promise<PeopleList> {
  const encName = encodeURIComponent(name);
  return fetchPeopleList(`${url}/people/?search=${encName}&format=json`);
}

function extractPeopleList(data: any): PeopleList {
  const count = data.count as number;
  const next = data.next as string | null;
  const results = (data.results as Character[]).map(({ name, gender }) => ({
    name,
    gender,
  }));
  return { count, next, results };
}

async function get(path: string): Promise<any> {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Network response was not OK");
    return response.json();
  } catch (e) {
    throw new Error("Can't GET resource");
  }
}
