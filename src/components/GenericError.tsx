import { Button } from "@chakra-ui/react";

export function GenericError() {
  return (
    <div className="default-container">
      <span>An error ocurred, try again later.</span>
      <Button onClick={window.location.reload}>Retry</Button>
    </div>
  );
}
