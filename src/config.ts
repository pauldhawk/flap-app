import { AppConfig } from "./schema";

const flapSpoolPitchRadius = (
  numberOfFlaps: number,
  holeRadius: number,
  holeSeparation: number
): number =>
  (numberOfFlaps * (holeRadius * 2 + holeSeparation)) / (2 * Math.PI);

const flapSpoolOuterRadius = (
  numberOfFlaps: number,
  holeRadius: number,
  holeSeparation: number,
  outset: number
): number =>
  flapSpoolPitchRadius(numberOfFlaps, holeRadius, holeSeparation) +
  holeRadius +
  outset;

const flapDefaults = {
  cornerRadius: 3.1,
  height: 43,
  notchDepth: 3.2,
  notchHeight: 15,
  numberOfFlaps: 52,
  pinWidth: 1.4,
  thickness: (30 / 1000) * 25.4,
  width: 54,
};

// const fontDefaults = {};
const spoolDefaults = {
  holeSeparation: 1.2,
  outset: 0.8,
};
const printDefaults = {
  // "Epsilon" - a small error tolerance value, used when designing 3d parts
  // to avoid exact complanar faces that cause OpenSCAD rendering artifacts
  // See https://3dprinting.stackexchange.com/a/9795
  epsilon: 0.01,
};

export const getConfig = (
  // fontOverrides = {},
  flapOverrides = {},
  printOverrides = {},
  spoolOverrides = {}
): AppConfig => {
  const flapConfig = {
    ...flapDefaults,
    ...flapOverrides,
  };
  const spoolConfig = {
    ...spoolDefaults,
    ...spoolOverrides,
  };
  const holeRadius = (flapConfig.pinWidth + 0.8) / 2;

  return {
    // characters: [],
    flapConfig: {
      ...flapConfig,
      gap: holeRadius * 2 - flapConfig.pinWidth + spoolConfig.holeSeparation,
    },
    // fontConfig: { ...fontDefaults, ...fontOverrides },
    printConfig: {
      ...printDefaults,
      ...printOverrides,
    },
    spoolConfig: {
      ...spoolConfig,
      holeRadius,
      outerRadius: flapSpoolOuterRadius(
        flapConfig.numberOfFlaps,
        holeRadius,
        spoolConfig.holeSeparation,
        spoolConfig.outset
      ),
      pitchRadius: flapSpoolPitchRadius(
        flapConfig.numberOfFlaps,
        holeRadius,
        spoolConfig.holeSeparation
      ),
    },
  };
};
