import { FlapConfig, PrintConfig } from "../schema";

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
}
