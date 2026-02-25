import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

import "./MapDetails.css";
import {
  Box,
  Button,
  CloseButton,
  FileUpload,
  Flex,
  Input,
  InputGroup,
  type FileUploadFileChangeDetails,
} from "@chakra-ui/react";

import { useNavigate } from "react-router";
import type { MapData } from "@/types";

import { LuFileUp } from "react-icons/lu";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

export function UploadMap() {
  const navigate = useNavigate();
  const [sourceGeoJson, setSourceGeoJson] = useState<MapData | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  if (!MAPBOX_TOKEN) {
    throw new Error(
      "Missing Mapbox Token: Please create a .env file in the root directory and add VITE_MAPBOX_TOKEN=your_token.",
    );
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (sourceGeoJson) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-81.73905, 30.26319],
        zoom: 11.7,
        dragRotate: true,
        style: "mapbox://styles/mapbox/standard",
        config: {
          basemap: {
            lightPreset: "night",
            showPointOfInterestLabels: true,
          },
        },
      });

      mapRef.current.on("load", () => {
        const map = mapRef.current;
        if (!map) return;

        map.addSource("urban-source", {
          type: "geojson",
          data: sourceGeoJson,
        });

        map.addLayer({
          id: "polygon-fill-layer",
          type: "fill",
          source: "urban-source",
          paint: {
            "fill-color": "#22d3ee",
            "fill-opacity": 0.1,
            "fill-emissive-strength": 1,
          },
        });

        map.addLayer({
          id: "polygon-border-layer",
          type: "line",
          source: "urban-source",
          paint: {
            "line-color": "#f9a5e4",
            "line-width": 0.2,
            "line-opacity": 1,
            "line-emissive-strength": 1,
          },
          filter: [
            "in",
            ["geometry-type"],
            ["literal", ["Polygon", "MultiPolygon"]],
          ],
        });

        map.addLayer({
          id: "points-layer",
          type: "circle",
          source: "urban-source",
          paint: {
            "circle-color": "#fde047",
            "circle-radius": 4,
            "circle-emissive-strength": 1,
          },
          filter: ["==", ["geometry-type"], "Point"],
        });

        map.on("click", ["polygon-fill-layer", "points-layer"], (e) => {
          const features = e.features;
          if (!features || features.length === 0) return;

          const properties = features[0].properties;
          if (!properties) return;

          new mapboxgl.Popup({ maxWidth: "400px" })
            .setLngLat(e.lngLat)
            .setHTML(
              `
          <div style="color: black; padding: 5px;">
            <strong style="display: block; margin-bottom: 5px; border-bottom: 1px solid #ccc;">
            ${properties.name || "Area details"}
          </strong>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 12px;">
            ${Object.entries(properties)
              .slice(0, 6)
              .map(([key, value]) => {
                if (key === "name") return "";
                return `<li>${key}: ${value ?? "N/A"}</li>`;
              })
              .join("")}
          </ul>
          </div>
        `,
            )
            .addTo(map);
        });
      });
    }

    return () => {
      mapRef.current?.remove();
    };
  }, [sourceGeoJson]);

  function handleNavigation() {
    navigate(-1);
  }

  async function handleFileChange(details: FileUploadFileChangeDetails) {
    const file = details.acceptedFiles[0];
    if (!file) return;
    try {
      const texto = await file.text();
      const jsonParsed = JSON.parse(texto);
      setSourceGeoJson(jsonParsed);
    } catch (err) {
      console.error("Error al leer el archivo:", err);
    }
  }

  return (
    <Box
      w={{ base: "100vw", lg: "40vw" }}
      h={"100vh"}
      p={4}
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Flex gap={4} justifyContent={"flex-start"} alignItems={"center"}>
        <Button onClick={handleNavigation} variant={"surface"}>
          {" "}
          ←{" "}
        </Button>

        <FileUpload.Root
          maxFiles={1}
          accept={"application/geo+json"}
          onFileChange={handleFileChange}
          gap="1"
          maxWidth="300px"
        >
          <FileUpload.HiddenInput />
          <FileUpload.Label>Upload file</FileUpload.Label>
          <InputGroup
            startElement={<LuFileUp />}
            endElement={
              <FileUpload.ClearTrigger
                onClick={() => {
                  setSourceGeoJson(null);
                  navigate(0);
                }}
                asChild
              >
                <CloseButton
                  me="-1"
                  size="xs"
                  variant="plain"
                  focusVisibleRing="inside"
                  focusRingWidth="2px"
                  pointerEvents="auto"
                />
              </FileUpload.ClearTrigger>
            }
          >
            <Input asChild>
              <FileUpload.Trigger>
                <FileUpload.FileText lineClamp={1} />
              </FileUpload.Trigger>
            </Input>
          </InputGroup>
        </FileUpload.Root>
      </Flex>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          backgroundColor: "#8b8b8b",
        }}
        className="map-container"
        ref={mapContainerRef}
      >
        {!sourceGeoJson ? <span>Here goes the map</span> : null}
      </div>
    </Box>
  );
}
