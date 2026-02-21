import { FILTERS } from "@/utils";
import {
  Box,
  createListCollection,
  Portal,
  Select,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";

export type MapFilters = Readonly<{
  handleChange: ({ value }: SelectValueChangeDetails) => void;
}>;
export function MapFilters({ handleChange }: MapFilters) {
  return (
    <Box
      position="fixed"
      top={"10px"}
      zIndex={1}
      w={{ base: "94vw", lg: "43vw" }}
    >
      <Select.Root
        collection={createListCollection({ items: FILTERS })}
        size="lg"
        variant={"subtle"}
        width={"100%"}
        onValueChange={handleChange}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a filter" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger _hover={{ cursor: "pointer" }}>
              Clear filters
            </Select.ClearTrigger>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {FILTERS.map((framework) => (
                <Select.Item item={framework} key={framework.value}>
                  {framework.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  );
}
