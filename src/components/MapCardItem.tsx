import type { MapTopics } from "@/types";
import { Card, Image } from "@chakra-ui/react";

export function MapCardItem({
  description,
  imageUrl,
  label,
  subLabel,
}: MapTopics) {
  return (
    <Card.Root
      _hover={{
        bg: "gray.800",
        cursor: "pointer",
        border: "1px solid white",
      }}
      w={{ base: "100%" }}
    >
      <Card.Body gap="2">
        <Image rounded="md" src={imageUrl} alt={label} />
        <Card.Title mt="2">{label}</Card.Title>
        <Card.Description fontWeight={"bold"}>{subLabel}</Card.Description>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
}
