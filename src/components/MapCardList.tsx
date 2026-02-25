import {
  Button,
  ButtonGroup,
  DataList,
  Flex,
  IconButton,
  Pagination,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { MapCardItem } from "./MapCardItem";
import type { MapTopics } from "@/types";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export type MapCardListProps = Readonly<{
  displayData: MapTopics[];
  isPending?: boolean;
}>;

export type LayoutCardsType = Readonly<"list" | "grid">;

export function MapCardList({
  displayData: data,
  isPending,
}: MapCardListProps) {
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState<LayoutCardsType>("list");

  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;

  const displayData = data.slice(startRange, endRange);

  function onChangeLayout() {
    const newLayout = layout === "list" ? "grid" : "list";
    setLayout(newLayout);
    setPageSize(newLayout === "list" ? 5 : 9);
  }

  if (isPending) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"md"} />
      </Flex>
    );
  }
  const isList = layout === "list";
  return (
    <Flex flexDirection={"column"}>
      <Button
        onClick={onChangeLayout}
      >{`Change to ${isList ? "grid" : "list"}`}</Button>
      <DataList.Root pt={5}>
        <SimpleGrid columns={isList ? 1 : 3} gap="4">
          {displayData.slice(0, pageSize).map((card) => (
            <MapCardItem layout={layout} key={card.id} {...card} />
          ))}
        </SimpleGrid>
      </DataList.Root>

      <Pagination.Root
        count={data.length}
        pageSize={pageSize}
        page={page}
        onPageChange={(e) => setPage(e.page)}
        mt={6}
      >
        <ButtonGroup variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <HiChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <HiChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Flex>
  );
}
