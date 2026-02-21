import type { MapTopics } from "@/types";
import { Box, Card, Image } from "@chakra-ui/react";

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
      flexDirection={"row"}
      overflow={"hidden"}
      rounded={"lg"}
    >
      <Image src={imageUrl} alt={label} objectFit="cover" maxW="200px" />
      <Box>
        <Card.Body>
          <Card.Title mb={1}>{label}</Card.Title>
          <Card.Description fontWeight={"bold"}>{subLabel}</Card.Description>
          <Card.Description>{description}</Card.Description>
        </Card.Body>
      </Box>
    </Card.Root>
  );
}
