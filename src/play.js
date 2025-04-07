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
const { intersect, subtract, union } = require("@jscad/modeling").booleans;
const { hull } = require("@jscad/modeling").hulls;
const flap = {
  corner_radius: 3.1,
  height: 43,
  height_auto: false,
  notch_height_auto: false,
  notch_height: 15,
  notch_depth: 3.2,
  number_of_flaps: 52,
  pin_width: 1.4,
  thickness: 0.7619999999999999,
  width: 54,
  gap: 2,
};

const spool = {
  hole_separation: 1.2,
  outset: 0.8,
  hole_radius: 1.1,
  outer_radius: 30.0385939386471,
  pitch_radius: 28.138593938647098,
};

const main = () => {
  const allPrimitives = [
    line([
      // bottom line
      [0, 0],
      [flap.width, 0],
    ]),
    line([
      // pin up
      [0, 0],
      [0, flap.pin_width],
    ]),
    line([
      // pin over
      [0, flap.pin_width],
      [flap.notch_depth, flap.pin_width],
    ]),
    line([
      // notch up
      [flap.notch_depth, flap.pin_width],
      [flap.notch_depth, flap.pin_width + flap.notch_height],
    ]),
    line([
      // notch back
      [flap.notch_depth, flap.pin_width + flap.notch_height],
      [0, flap.pin_width + flap.notch_height],
    ]),
    line([
      // side up
      [0, flap.pin_width + flap.notch_height],
      [0, flap.height - flap.corner_radius],
    ]),
    arc({
      // top left corner
      center: [flap.corner_radius, flap.height - flap.corner_radius],
      radius: flap.corner_radius,
      // startAngle: Math.PI, // Start at 180 degrees
      // endAngle: Math.PI * 1.5, // End at 270 degrees
      // segments: 32, // Optional: Number of segments for smoothness
    }),
    line([
      // top
      [flap.corner_radius, flap.height],
      [flap.width - flap.corner_radius, flap.height],
    ]),
    arc({
      // top right corner
      center: [
        flap.width - flap.corner_radius,
        flap.height - flap.corner_radius,
      ],
      radius: flap.corner_radius,
      // startAngle: Math.PI, // Start at 180 degrees
      // endAngle: Math.PI * 1.5, // End at 270 degrees
      // segments: 32, // Optional: Number of segments for smoothness
    }),
    line([
      // side up
      [flap.width, flap.pin_width + flap.notch_height],
      [flap.width, flap.height - flap.corner_radius],
    ]),
    line([
      // notch back
      [flap.width - flap.notch_depth, flap.pin_width + flap.notch_height],
      [flap.width, flap.pin_width + flap.notch_height],
    ]),
    line([
      // notch up
      [flap.width - flap.notch_depth, flap.pin_width],
      [flap.width - flap.notch_depth, flap.pin_width + flap.notch_height],
    ]),
    line([
      // pin over
      [flap.width, flap.pin_width],
      [flap.width - flap.notch_depth, flap.pin_width],
    ]),
    line([
      // pin up
      [flap.width, 0],
      [flap.width, flap.pin_width],
    ]),
  ];

  return allPrimitives;
};

module.exports = { main };

// line([
//   // pin up
//   [0, 0],
//   [0, flap.pin_width],
// ]),
// line([
//   // pin over
//   [0, flap.pin_width],
//   [flap.notch_depth, flap.pin_width],
// ]),
