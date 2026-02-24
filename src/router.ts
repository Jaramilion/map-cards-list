import { createBrowserRouter } from "react-router";
import App from "./app/App";
import { apiClient } from "./client/api";
import { API_URL } from "./utils";

import type { MapConfig, MapData, MapTopics } from "./types";
import { Loading } from "./components/Loading";
import { GenericError } from "./components/GenericError";
import { sanitizeData } from "./utils/misc";
import { MapDetails } from "./app/MapDetails";
import { RootLayout } from "./app/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: App,
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
        Component: MapDetails,
        loader: async ({ params }) => {
          const { mapId } = params;
          const data = await apiClient<MapTopics[]>({ url: API_URL });
          const sanitizedData = sanitizeData(data);
          const item = sanitizedData.find((item) => item.id === mapId);

          if (!item) {
            console.error("Map details not found");
            throw new Error("Map details not found");
          }

          const mapData = await apiClient<MapConfig>({ url: item.dataUrl });
          const config = await apiClient<MapData>({ url: item.configUrl });

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
