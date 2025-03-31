import { getConfig } from "./config.ts";
const {
  characters,
  flapConfig: flapConfig,
  fontConfig,
  spoolConfig,
} = getConfig();
console.log(characters);
console.log(flapConfig);
console.log(fontConfig);
console.log(spoolConfig);
