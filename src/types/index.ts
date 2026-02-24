import type { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";

export type MapTopics = Readonly<{
  id: string;
  label: string;
  queryType: string;
  imageUrl: string;
  description: string;
  subLabel: string;
  visible: string;
  dataUrl: string;
  configUrl: string;
}>;

export type MapConfig = Readonly<{
  version: string;
  config: {
    mapState: {
      bearing: number;
      dragRotate: boolean;
      latitude: number;
      longitude: number;
      pitch: number;
      zoom: number;
      isSplit: boolean;
    };
    mapStyle: {
      styleType: string;
      topLayerGroups: Record<string, boolean>;
      visibleLayerGroups: Record<string, boolean>;
    };
  };
}>;

export type MapData = FeatureCollection<Geometry, GeoJsonProperties>;
