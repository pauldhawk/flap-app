import { booleans, colors, primitives, transforms } from "@jscad/modeling";
const { cube, cuboid, line, sphere, star } = primitives;
const { intersect, subtract } = booleans;
const { colorize } = colors;

export const exampleShapes = () => {
  const rect = primitives.rectangle({ size: [30, 20] });
  const circle = primitives.circle({ radius: 10, segments: 32 });
  // Move the circle to avoid overlap
  const movedCircle = transforms.translate([40, 0, 0], circle);

  const logo = [
    colorize(
      [1.0, 0.4, 1.0],
      subtract(cube({ size: 300 }), sphere({ radius: 200 }))
    ),
    colorize(
      [1.0, 1.0, 0],
      intersect(sphere({ radius: 130 }), cube({ size: 210 }))
    ),
  ];

  const transpCube = colorize(
    [1, 0, 0, 0.75],
    cuboid({
      size: [100 * Math.random(), 100, 210 + 200 * Math.random()],
    })
  );
  const star2D = star({ vertices: 8, innerRadius: 300, outerRadius: 400 });
  const line2D = colorize(
    [1.0, 0, 0],
    line([
      [260, 260],
      [-260, 260],
      [-260, -260],
      [260, -260],
      [260, 260],
    ])
  );
  // some colors are intentionally without alpfa channel to test geom2ToGeometries will add alpha channel
  const colorChange = [
    [1, 0, 0, 1],
    [1, 0.5, 0],
    [1, 0, 1],
    [0, 1, 0],
    [0, 0, 0.7],
  ];
  star2D.sides.forEach((side: any, i: number) => {
    if (i >= 2) side.color = colorChange[i % colorChange.length];
  });
  return [rect, movedCircle, transpCube, line2D, star2D, ...logo];
};
