// import * as THREE from "three";
// import { getConfig } from "./config.ts";
// import { drawFlap } from "./shapes/flap.ts";

// // Get the global configs
// const { flapConfig, printConfig } = getConfig();

// const scene = new THREE.Scene();

// // Set up the camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 200;

// // Set up the renderer
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Draw the flap shape:
// const shape = drawFlap(flapConfig, printConfig);
// scene.add(shape);
// // Render loop
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();
import {
  prepareRender,
  drawCommands,
  cameras,
  entitiesFromSolids,
} from "@jscad/regl-renderer";
import { colors, primitives, booleans, transforms } from "@jscad/modeling";
const { cube, cuboid, line, sphere, star } = primitives;
const { intersect, subtract } = booleans;
const { colorize } = colors;

const width = window.innerWidth;
const height = window.innerHeight;
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
const shapes = [rect, movedCircle, transpCube, line2D, star2D, ...logo];

const entities = entitiesFromSolids({}, ...shapes);

// prepare the camera
const perspectiveCamera = cameras.perspective;
const camera = Object.assign({}, perspectiveCamera.defaults);
perspectiveCamera.setProjection(camera, camera, { width, height });
perspectiveCamera.update(camera, camera);

const options = {
  glOptions: { container: document.body },
  camera,
  drawCommands: {
    // draw commands bootstrap themselves the first time they are run
    drawAxis: drawCommands.drawAxis,
    drawGrid: drawCommands.drawGrid,
    drawLines: drawCommands.drawLines,
    drawMesh: drawCommands.drawMesh,
  },
  // data
  entities: [
    {
      visuals: {
        drawCmd: "drawGrid",
        show: true,
      },
      size: [500, 500],
      ticks: [25, 5],
    },
    {
      visuals: {
        drawCmd: "drawAxis",
        show: true,
      },
      size: 300,
    },
    ...entities,
  ],
};
// prepare
const render = prepareRender(options);
// do the actual render :  it is a simple function !
render(options);

// some live animation example
let tick = 0;

// let updateCounter = 0;
const updateAndRender = () => {
  tick += 0.01;
  camera.position[0] = Math.cos(tick) * 800;
  perspectiveCamera.update(camera, camera);
  options.camera = camera;

  render(options);
  window.requestAnimationFrame(updateAndRender);
};
window.requestAnimationFrame(updateAndRender);
