import {
  cameras,
  drawCommands,
  entitiesFromSolids,
  prepareRender,
} from "@jscad/regl-renderer";
import { exampleShapes } from "./shapes/example_shapes";

const width = window.innerWidth;
const height = window.innerHeight;

const shapes = exampleShapes();
// const flap = drawFlap();
// @ts-ignore
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
