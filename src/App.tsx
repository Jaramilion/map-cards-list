import {
  Button,
  DataList,
  Flex,
  Spinner,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { API_URL } from "./utils";
import type { MapTopics } from "./types";
import { useState } from "react";
import { MapFilters } from "./components/MapFilters";
import { MapCardItem } from "./components/MapCardItem";

function App() {
  const { data, loading, error, retry } = useFetch<MapTopics[]>(API_URL);
  const [filteredData, setFilteredData] = useState<MapTopics[] | null>(null);

  function handleChange({ value }: SelectValueChangeDetails) {
    window.scrollTo(0, 0);
    if (value.length === 0) {
      return setFilteredData(data);
    }
    const newFilteredData = data.filter((item) => item.subLabel === value[0]);
    setFilteredData(newFilteredData);
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
      w={{ md: "100vw", lg: "45vw" }}
      minHeight={"100vh"}
      bg="#242424"
      gap={2}
      p={4}
      pb={12}
    >
      <MapFilters handleChange={handleChange} />
      <DataList.Root pt={16}>
        {displayData.map((card) => (
          <MapCardItem key={card.description} {...card} />
        ))}
      </DataList.Root>
    </Flex>
  );
}

export default App;
