declare module "@/data/buildings.json" {
  const value: {
    type: "FeatureCollection";
    features: Array<{
      type: "Feature";
      geometry: {
        type: "Point";
        coordinates: [number, number];
      };
      properties: {
        id: string;
        name: string;
        category: string;
        description: string;
      };
    }>;
  };
  export default value;
}
