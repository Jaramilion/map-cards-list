import type { MapTopics } from "@/types";
import { Avatar, Box, Card, Image } from "@chakra-ui/react";
import { Link } from "react-router";
import type { LayoutCardsType } from "./MapCardList";

export function MapCardItem({
  description,
  imageUrl,
  label,
  subLabel,
  id,
  layout,
}: MapTopics & { layout: LayoutCardsType }) {
  const isList = layout === "list";
  return (
    <Link to={`/${id}`}>
      <Card.Root
        _hover={{
          bg: "gray.800",
          cursor: "pointer",
          border: "1px solid white",
        }}
        flexDirection={"row"}
        overflow={"hidden"}
        rounded={"lg"}
        h={isList ? 200 : 300}
      >
        {isList ? (
          <Image
            src={imageUrl}
            alt={label}
            objectFit="cover"
            w={{ base: "100px", md: "150px" }}
          />
        ) : null}
        <Box>
          <Card.Body>
            {!isList ? (
              <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src={imageUrl} />
                <Avatar.Fallback name={label} />
              </Avatar.Root>
            ) : null}
            <Card.Title mb={1}>{label}</Card.Title>
            <Card.Description fontWeight={"bold"}>{subLabel}</Card.Description>
            <Card.Description>{description}</Card.Description>
          </Card.Body>
        </Box>
      </Card.Root>
    </Link>
  );
}
