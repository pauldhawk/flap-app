import {
  booleans,
  colors,
  extrusions,
  hulls,
  primitives,
  transforms,
} from "@jscad/modeling";
import { FlapConfig, PrintConfig } from "../schema";
// @ts-ignore
const { cube, cuboid, line, sphere, star } = primitives;
// @ts-ignore
const { intersect, subtract, union } = booleans;
// @ts-ignore
const { colorize } = colors;
const { translate } = transforms;
export function drawFlap(flapConfig: FlapConfig, printConfig: PrintConfig) {
  const { epsilon } = printConfig;
  const {
    cornerRadius,
    height,
    notchDepth,
    notchHeight,
    width,
    thickness,
    pinWidth,
  } = flapConfig;
  const { hull } = hulls;
  const { extrudeLinear } = extrusions;
  console.log(
    "drawFlap",
    cornerRadius,
    height,
    notchDepth,
    notchHeight,
    width,
    epsilon
  );
  // const circle = primitives.circle({ radius: 10, segments: 32 });
  const rectHeight = height - cornerRadius;

  const rect = primitives.rectangle({
    size: [width, rectHeight],
    center: [width / 2, rectHeight / 2],
  });

  const flapTop = hull(
    primitives.circle({
      radius: cornerRadius,
      segments: 32,
      center: [cornerRadius, rectHeight],
    }),
    primitives.circle({
      radius: cornerRadius,
      segments: 32,
      center: [width - cornerRadius, rectHeight],
    })
  );
  const flapNoCuts = union(rect, flapTop);
  // const flapWithNotch = subtract(
  //   flapNoCuts,
  //   primitives.rectangle({
  //     size: [notchDepth, notchHeight],
  //     center: [0, notchHeight / 2 + pinWidth],
  //   }),
  //   primitives.rectangle({
  //     size: [notchDepth, notchHeight],
  //     center: [width - notchDepth / 2, notchHeight / 2 + pinWidth],
  //   })
  // );
  const leftNotch = primitives.rectangle({
    size: [notchDepth, notchHeight],
    center: [0, notchHeight / 2 + pinWidth],
  });
  const rightNotch = primitives.rectangle({
    size: [notchDepth, notchHeight],
    center: [width - notchDepth / 2, notchHeight / 2 + pinWidth],
  });
  const finalFlap = colorize(
    [1, 0, 0],
    extrudeLinear({ height: thickness }, flapNoCuts)
  );
  return [finalFlap, leftNotch, rightNotch];
}
