import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "./MapDetails.css";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import { useLoaderData, useNavigate } from "react-router";
import type { MapConfig, MapData } from "@/types";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
if (MAPBOX_TOKEN) {
  mapboxgl.accessToken = MAPBOX_TOKEN;
}

export function MapDetails() {
  const { label, config, data } = useLoaderData<{
    label: string;
    config: MapConfig;
    data: MapData;
  }>();

  const navigate = useNavigate();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  if (!MAPBOX_TOKEN) {
    throw new Error(
      "Missing Mapbox Token: Please create a .env file in the root directory and add VITE_MAPBOX_TOKEN=your_token.",
    );
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const { mapState, mapStyle } = config.config;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [mapState.longitude, mapState.latitude],
      zoom: mapState.zoom,
      pitch: mapState.pitch,
      bearing: mapState.bearing,
      dragRotate: mapState.dragRotate,
      style: "mapbox://styles/mapbox/standard",
      config: {
        basemap: {
          lightPreset: mapStyle.styleType === "dark" ? "night" : "dawn",
          showPointOfInterestLabels: true,
        },
      },
    });

    mapRef.current.on("load", () => {
      const map = mapRef.current;
      if (!map) return;

      map.addSource("urban-source", {
        type: "geojson",
        data: data,
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

    return () => {
      mapRef.current?.remove();
    };
  }, [config, data]);

  function handleNavigation() {
    navigate(-1);
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
        <Heading size={{ base: "xl", md: "2xl" }}>{label}</Heading>
      </Flex>
      <div className="map-container" ref={mapContainerRef}></div>
    </Box>
  );
}
