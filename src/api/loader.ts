import { useEffect, useState } from "react";

export type List<T> = {
  count: number;
  next: string | null;
  results: T[];
};

type Loader<T, V> = {
  count: number;
  results: T[];
  search(value: V): Promise<void>;
  loadMore(): Promise<void>;
  loading: boolean;
  error: boolean;
  resetError(): void;
};

type LoaderDeps<T, V> = {
  fetch(url: string): Promise<List<T>>;
  search(value: V): Promise<List<T>>;
  initSearchVal: V;
};

export function loader<T, V>(deps: LoaderDeps<T, V>): () => Loader<T, V> {
  return () => {
    const [count, setCount] = useState(0);
    const [next, setNext] = useState<string | null>(null);
    const [results, setResults] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const setList = async (searchVal: V) => {
      setLoading(true);
      setError(false);
      try {
        const list = await deps.search(searchVal);
        setCount(list.count);
        setNext(list.next);
        setResults(list.results);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };

    const loadList = async (nextUrl: string) => {
      setLoading(true);
      setError(false);
      try {
        const list = await deps.fetch(nextUrl);
        setCount(list.count);
        setNext(list.next);
        setResults((r) => r.concat(list.results));
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };

    useEffect(() => {
      setList(deps.initSearchVal);
    }, []);

    const search = (value: V) => setList(value);

    const loadMore = () => {
      if (next === null) return Promise.reject();
      return loadList(next);
    };

    const resetError = () => setError(false);

    return { count, results, search, loadMore, loading, error, resetError };
  };
}
