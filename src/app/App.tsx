import { Flex, type SelectValueChangeDetails } from "@chakra-ui/react";
import "./App.css";

import type { MapTopics } from "../types";

import { MapFilters } from "../components/MapFilters";

import { MapCardList } from "../components/MapCardList";
import { useLoaderData, useSearchParams } from "react-router";

function App() {
  const data = useLoaderData<MapTopics[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get("subLabel") || "";

  function handleFiltersChange({ value }: SelectValueChangeDetails) {
    window.scrollTo(0, 0);
    setSearchParams({ subLabel: value });
  }

  const filteredData = filter
    ? data.filter((item) => item.subLabel === filter)
    : data;

  return (
    <Flex
      flexDirection={"column"}
      w={{ md: "100vw", lg: "40vw" }}
      bg="#242424"
      gap={2}
      pb={12}
      p={4}
    >
      <MapFilters value={[filter]} handleChange={handleFiltersChange} />
      <MapCardList displayData={filteredData} />
    </Flex>
  );
}

export default App;
