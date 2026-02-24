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

export type MapData = Readonly<{
  type: "FeatureCollection";
  label: string;
  features: Array<{
    type: "Feature";
    geometry: {
      type: "MultiPolygon";
      coordinates: number[][][][];
    };
    properties: {
      name: string;
      [key: string]: number | null | string;
    };
  }>;
}>;
