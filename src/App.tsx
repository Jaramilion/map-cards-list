import {
  Button,
  Flex,
  Spinner,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { API_URL } from "./utils";
import type { MapTopics } from "./types";
import { useState, useTransition } from "react";
import { MapFilters } from "./components/MapFilters";

import { sleep } from "./utils/misc";
import { MapCardList } from "./components/MapCardList";

function App() {
  const { data, loading, error, retry } = useFetch<MapTopics[]>(API_URL);

  const [filteredData, setFilteredData] = useState<MapTopics[] | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFiltersChange({ value }: SelectValueChangeDetails) {
    startTransition(async () => {
      await sleep(400);
      window.scrollTo(0, 0);
      if (value.length === 0) {
        return setFilteredData(data);
      }
      const newFilteredData = data.filter((item) => item.subLabel === value[0]);
      setFilteredData(newFilteredData);
    });
  }

  const displayData = filteredData ?? data;

  if (loading) {
    return (
      <div className="default-container">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="default-container">
        <span>An error ocurred, try again later.</span>
        <Button onClick={retry}>Retry</Button>
      </div>
    );
  }

  return (
    <Flex
      flexDirection={"column"}
      w={{ md: "100vw", lg: "40vw" }}
      bg="#242424"
      gap={2}
      pb={12}
      p={4}
    >
      <MapFilters handleChange={handleFiltersChange} />
      <MapCardList displayData={displayData} isPending={isPending} />
    </Flex>
  );
}

export default App;
