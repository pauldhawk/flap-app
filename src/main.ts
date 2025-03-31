import * as THREE from "three";
import { getConfig } from "./config.ts";
import { FlapConfig, PrintConfig } from "./schema.ts";

// Get the global configs
const { flapConfig, spoolConfig, printConfig } = getConfig();
const color_grey = 0x888888;
const color_orange = 0xff9900;
const color_blue = 0x0000ff;
console.log(flapConfig);
console.log(spoolConfig);

const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 200;

// Set up the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const _drawNotchShape = (
  flapConfig: FlapConfig,
  printConfig: PrintConfig,
  color = color_orange
) => {
  const w = printConfig.epsilon + flapConfig.notchDepth;
  const h = flapConfig.notchHeight;
  const shape = new THREE.Shape();
  shape.moveTo(0, 0); // bottom-left
  shape.lineTo(w, 0); // bottom-left to bottom-right
  shape.lineTo(w, h); // bottom-right to top-right
  shape.lineTo(0, h); // top-right to top-left
  shape.lineTo(0, 0); // top-left to bottom-left

  return new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({ color })
  );
};
export function drawFlap(flapConfig: FlapConfig, printConfig: PrintConfig) {
  const w = flapConfig.width;
  const h = flapConfig.height;
  const r = flapConfig.cornerRadius;

  // Main flap shape with rounded top corners
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(w, 0);
  shape.lineTo(w, h - r);
  shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(r, h);
  shape.absarc(r, h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(0, 0);

  // Notch shape (small rectangle)
  const nw = printConfig.epsilon + flapConfig.notchDepth;
  const nh = flapConfig.notchHeight;
  const notchShape = new THREE.Shape();
  notchShape.moveTo(0, 0);
  notchShape.lineTo(nw, 0);
  notchShape.lineTo(nw, nh);
  notchShape.lineTo(0, nh);
  notchShape.lineTo(0, 0);

  shape.holes.push(notchShape);
  const shapeGeometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(shapeGeometry, material);

  return mesh;
}

// Example usage (if running in a browser scene setup):
const shape = drawFlap(flapConfig, printConfig);

scene.add(shape);
scene.add(new THREE.BoxHelper(shape, 0xffff00));
// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
