import { booleans, colors, primitives } from "@jscad/modeling";
import { FlapConfig, PrintConfig } from "../schema";
// @ts-ignore
const { cube, cuboid, line, sphere, star } = primitives;
// @ts-ignore
const { intersect, subtract } = booleans;
// @ts-ignore
const { colorize } = colors;

export function drawFlap(flapConfig: FlapConfig, printConfig: PrintConfig) {
  const { epsilon } = printConfig;
  const { cornerRadius, height, notchDepth, notchHeight, width } = flapConfig;

  console.log(
    "drawFlap",
    cornerRadius,
    height,
    notchDepth,
    notchHeight,
    width,
    epsilon
  );
  const rect = primitives.rectangle({ size: [30, 20] });
  return [rect];
}
