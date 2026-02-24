import { Flex, Input } from "@chakra-ui/react";
import "./App.css";

import type { MapTopics } from "../types";

import { MapCardList } from "../components/MapCardList";
import { useLoaderData, useSearchParams } from "react-router";
import { useState, type ChangeEvent } from "react";

export function App() {
  const data = useLoaderData<MapTopics[]>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState("");

  const filter = searchParams.get("subLabel") || "";

  function handleFilterChange(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    const filterLength = event.target.value.length;
    if (filterLength > 1 || filterLength === 0) {
      setSearchParams({ subLabel: event.target.value });
    }
    setValue(event.target.value);
  }

  const filteredData = filter
    ? data.filter((item) => item.subLabel.includes(filter))
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
      {/* <MapFilters value={[filter]} handleChange={handleFiltersChange} /> */}
      <Input variant={"subtle"} value={value} onChange={handleFilterChange} />

      <MapCardList displayData={filteredData} />
    </Flex>
  );
}
