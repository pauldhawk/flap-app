const {
  arc,
  circle,
  ellipse,
  line,
  polygon,
  rectangle,
  roundedRectangle,
  square,
  star,
} = require("@jscad/modeling").primitives;
const { translate } = require("@jscad/modeling").transforms;

const { translate } = require("@jscad/modeling").transforms;
const { intersect, subtract, union } = require("@jscad/modeling").booleans;
const { hull } = require("@jscad/modeling").hulls;
const flapConfig = {
  corner_radius: 3.1,
  height: 43,
  height_auto: false,
  notch_height_auto: false,
  notch_height_default: 15,
  notch_depth: 3.2,
  number_of_flaps: 52,
  pin_width: 1.4,
  thickness: 0.7619999999999999,
  width: 54,
  gap: 2,
};

const spoolConfig = {
  hole_separation: 1.2,
  outset: 0.8,
  hole_radius: 1.1,
  outer_radius: 30.0385939386471,
  pitch_radius: 28.138593938647098,
};

const main = () => {
  const allPrimitives = [
    arc({
      center: [-1, -1],
      radius: 2,
      startAngle: 0,
      endAngle: Math.PI / 2,
      makeTangent: false,
      segments: 32,
    }),
    line([
      [1, 1],
      [-1, -1],
      [1, -1],
    ]),
    circle({ radius: 1.8, segments: 10 }),
    ellipse({ radius: [0.7, 2] }),
    polygon({
      points: [
        [-3, -1],
        [3, -1],
        [3.5, 2],
        [1.5, 1],
        [0, 2],
        [-1.5, 1],
        [-3.5, 2],
      ],
    }),
    rectangle({ size: [2, 3] }),
    roundedRectangle({ size: [4, 3], roundRadius: 0.7 }),
    square({ size: 3.5 }),
    star(),
    star({
      vertices: 9,
      outerRadius: 2,
      innerRadius: 0.8,
      density: 2,
      startAngle: Math.PI / 18,
    }),
  ];

  return allPrimitives.map((primitive, index) =>
    translate(
      [((index % 4) - 2) * 6, Math.floor(index / 4 - 2) * 6, 0],
      primitive
    )
  );
};

module.exports = { main };
