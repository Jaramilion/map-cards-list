import { Spinner } from "@chakra-ui/react";

export function Loading() {
  return (
    <div className="default-container">
      <Spinner size="xl" color="blue.500" />
    </div>
  );
}
