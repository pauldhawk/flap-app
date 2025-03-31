const flap_spool_pitch_radius = (
  number_of_flaps: number,
  hole_radius: number,
  hole_separation: number
): number =>
  (number_of_flaps * (hole_radius * 2 + hole_separation)) / (2 * Math.PI);

const flap_spool_outer_radius = (
  number_of_flaps: number,
  hole_radius: number,
  hole_separation: number,
  outset: number
): number =>
  flap_spool_pitch_radius(number_of_flaps, hole_radius, hole_separation) +
  hole_radius +
  outset;

const flap_defaults = {
  corner_radius: 3.1,
  height: 43,
  height_auto: false,
  notch_height_auto: false,
  notch_height_default: 15,
  notch_depth: 3.2,
  number_of_flaps: 52,
  pin_width: 1.4,
  thickness: (30 / 1000) * 25.4,
  width: 54,
};

const font_defaults = {};
const spool_defaults = {
  hole_separation: 1.2,
  outset: 0.8,
};

export const get_config = (
  font_overrides = {},
  flap_overrides = {},
  spool_overrides = {}
) => {
  const flap_config = {
    ...flap_defaults,
    ...flap_overrides,
  };
  const spool_config = {
    ...spool_defaults,
    ...spool_overrides,
  };
  const hole_radius = (flap_config.pin_width + 0.8) / 2;

  return {
    characters: [],
    flap_config: {
      ...flap_config,
      gap:
        hole_radius * 2 - flap_config.pin_width + spool_config.hole_separation,
    },
    font_config: { ...font_defaults, ...font_overrides },
    spool_config: {
      ...spool_config,
      hole_radius,
      outer_radius: flap_spool_outer_radius(
        flap_config.number_of_flaps,
        hole_radius,
        spool_config.hole_separation,
        spool_config.outset
      ),
      pitch_radius: flap_spool_pitch_radius(
        flap_config.number_of_flaps,
        hole_radius,
        spool_config.hole_separation
      ),
    },
  };
};
