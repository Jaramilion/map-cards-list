import {
  ButtonGroup,
  DataList,
  Flex,
  IconButton,
  Pagination,
  Spinner,
} from "@chakra-ui/react";
import { MapCardItem } from "./MapCardItem";
import type { MapTopics } from "@/types";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const PAGE_SIZE = 5;

export type MapCardListProps = Readonly<{
  displayData: MapTopics[];
  isPending?: boolean;
}>;
export function MapCardList({
  displayData: data,
  isPending,
}: MapCardListProps) {
  const [page, setPage] = useState(1);

  const startRange = (page - 1) * PAGE_SIZE;
  const endRange = startRange + PAGE_SIZE;

  const displayData = data.slice(startRange, endRange);

  if (isPending) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"md"} />
      </Flex>
    );
  }
  return (
    <Flex flexDirection={"column"}>
      <DataList.Root pt={5}>
        {displayData.slice(0, PAGE_SIZE).map((card) => (
          <MapCardItem key={card.id} {...card} />
        ))}
      </DataList.Root>
      <Pagination.Root
        count={data.length}
        pageSize={PAGE_SIZE}
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
