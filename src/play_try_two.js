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
/*
module flap_2d(cut_tabs = true) {
    translate([0, -flap_pin_width/2, 0])
    difference() {
        union() {
            square([flap_width, flap_height - flap_corner_radius]);

            // rounded corners
            hull() {
                translate([flap_corner_radius, flap_height - flap_corner_radius])
                    circle(r=flap_corner_radius, $fn=40);
                translate([flap_width - flap_corner_radius, flap_height - flap_corner_radius])
                    circle(r=flap_corner_radius, $fn=40);
            }
        }
        // spool tabs
        if(cut_tabs) {
            translate([-eps, flap_pin_width])
                square([eps + flap_notch_depth, flap_notch_height]);
            translate([flap_width - flap_notch_depth, flap_pin_width])
                square([eps + flap_notch_depth, flap_notch_height]);
        }
    }
}
    const topHull = hull(leftCircle, rightCircle);
*/
const flap_2d = () => {
  const leftCircle = translate(
    [flapConfig.width, 0, 0],
    circle({
      radius: flapConfig.corner_radius,
    })
  );
  const rightCircle = translate(
    [0, flapConfig.height, 0],
    circle({
      radius: flapConfig.corner_radius,
    })
  );

  const flap_main = rectangle({
    size: [flapConfig.width, flapConfig.height - flapConfig.corner_radius],
  });
  const top_bot = union(flap_main, topHull);
  return [flap_main, leftCircle, rightCircle];
};

const main = () => {
  const allPrimitives = flap_2d();

  return allPrimitives.map((primitive, index) =>
    translate([-10, 0, 0], primitive)
  );
};

module.exports = { main };
