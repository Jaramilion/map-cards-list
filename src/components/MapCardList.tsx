import { DataList, Flex, Spinner } from "@chakra-ui/react";
import { MapCardItem } from "./MapCardItem";
import type { MapTopics } from "@/types";

export type MapCardListProps = Readonly<{
  displayData: MapTopics[];
  isPending: boolean;
}>;
export function MapCardList({ displayData, isPending }: MapCardListProps) {
  if (isPending) {
    return (
      <Flex minH={"100vh"} alignItems={"center"} justifyContent={"center"}>
        <Spinner size={"md"} />
      </Flex>
    );
  }
  return (
    <DataList.Root pt={20}>
      {displayData.map((card) => (
        <MapCardItem key={card.description} {...card} />
      ))}
    </DataList.Root>
  );
}
