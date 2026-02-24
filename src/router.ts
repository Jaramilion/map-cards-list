import { createBrowserRouter } from "react-router";
import { apiClient } from "./client/api";
import { API_URL } from "./utils";

import type { MapConfig, MapData, MapTopics } from "./types";
import { Loading } from "./components/Loading";
import { GenericError } from "./components/GenericError";
import { sanitizeData } from "./utils/misc";

// El RootLayout se importa estáticamente porque es el "cascarón" de tu app
// y se necesita inmediatamente para mostrar la UI inicial y el Loading.
import { RootLayout } from "./app/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: async () => {
          const { App } = await import("./app/App");
          return { Component: App };
        },
        loader: async () => {
          const data = await apiClient<MapTopics[]>({ url: API_URL });
          return sanitizeData(data);
        },
        HydrateFallback: Loading,
        ErrorBoundary: GenericError,
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          return currentUrl.pathname !== nextUrl.pathname;
        },
      },
      {
        path: ":mapId",

        lazy: async () => {
          const { MapDetails } = await import("./app/MapDetails");
          return { Component: MapDetails };
        },
        loader: async ({ params }) => {
          const { mapId } = params;
          const data = await apiClient<MapTopics[]>({ url: API_URL });
          const sanitizedData = sanitizeData(data);
          const item = sanitizedData.find((item) => item.id === mapId);

          if (!item) {
            console.error("Map details not found");
            throw new Error("Map details not found");
          }

          const [mapData, config] = await Promise.all([
            apiClient<MapConfig>({ url: item.dataUrl }),
            apiClient<MapData>({ url: item.configUrl }),
          ]);

          return {
            config,
            data: mapData,
            label: item.label,
          };
        },
        HydrateFallback: Loading,
        ErrorBoundary: GenericError,
      },
    ],
  },
]);
