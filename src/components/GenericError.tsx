import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export function GenericError() {
  const navigate = useNavigate();
  function handleRetry() {
    navigate(0);
  }
  return (
    <div className="default-container">
      <span>An error ocurred, try again later.</span>
      <Button onClick={handleRetry}>Retry</Button>
    </div>
  );
}
