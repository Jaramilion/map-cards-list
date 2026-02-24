import { FILTERS } from "@/utils";
import {
  createListCollection,
  Portal,
  Select,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";

export type MapFilters = Readonly<{
  handleChange: ({ value }: SelectValueChangeDetails) => void;
  value: string[];
}>;
export function MapFilters({ handleChange, value }: MapFilters) {
  return (
    <Select.Root
      position="sticky"
      top={"10px"}
      zIndex={1}
      w={{ base: "100%" }}
      collection={createListCollection({ items: FILTERS })}
      size="lg"
      variant={"subtle"}
      onValueChange={handleChange}
      value={value}
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
            {FILTERS.map((item) => (
              <Select.Item item={item} key={item.value}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
