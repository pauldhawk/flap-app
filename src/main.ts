import {
  cameras,
  drawCommands,
  entitiesFromSolids,
  prepareRender,
} from "@jscad/regl-renderer";
import { getConfig } from "./config";
import { drawFlap } from "./shapes/flap";

const width = window.innerWidth;
const height = window.innerHeight;
const { flapConfig, printConfig } = getConfig();
// const shapes = exampleShapes();
const flap = drawFlap(flapConfig, printConfig);
// @ts-ignore
const entities = entitiesFromSolids({}, ...flap);

// prepare the camera
const perspectiveCamera = cameras.perspective;
const camera = Object.assign({}, perspectiveCamera.defaults);
camera.up = [0, 1, 0];
// camera.position = [0, 0, 500];
camera.target = [0, 0, 0];
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
// let tick = 0;

// let updateCounter = 0;
// const updateAndRender = () => {
//   tick += 0.01;
//   camera.position[0] = Math.cos(tick) * 800;
//   perspectiveCamera.update(camera, camera);
//   options.camera = camera;

//   render(options);
//   window.requestAnimationFrame(updateAndRender);
// };
// window.requestAnimationFrame(updateAndRender);
