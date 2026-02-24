import type { MapConfig, MapData } from "@/types";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router";
import "./MapDetails.css";

export function MapDetails() {
  const { data, config, label } = useLoaderData<{
    config: MapConfig;
    data: MapData;
    label: string;
  }>();

  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  return (
    <Flex
      w={{ md: "100vw", lg: "40vw" }}
      h={"100vh"}
      p={4}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Flex gap={4} justifyContent={"center"} alignItems={"center"}>
        <Button onClick={handleGoBack} variant={"surface"}>
          {" "}
          ←{" "}
        </Button>
        <Heading size={{ base: "xl", md: "2xl" }}>{label}</Heading>
      </Flex>
    </Flex>
  );
}
