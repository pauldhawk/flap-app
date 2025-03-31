export type Circle = {
  kind: "circle";
  radius: number;
};

export type FlapConfig = {
  cornerRadius: number;
  gap: number;
  height: number;
  notchHeight: number;
  notchDepth: number;
  numberOfFlaps: number;
  pinWidth: number;
  thickness: number;
  width: number;
};
export type SpoolConfig = {
  holeRadius: number;
  holeSeparation: number;
  outset: number;
  outerRadius: number;
  pitchRadius: number;
};

export type AppConfig = {
  // characters: Array;
  flapConfig: FlapConfig;
  spoolConfig: SpoolConfig;
};
