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

export function drawFlap(flapConfig: FlapConfig, printConfig: PrintConfig) {
  const { epsilon } = printConfig;
  const { cornerRadius, height, notchDepth, notchHeight, width } = flapConfig;

  // Main flap shape with rounded top corners
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(width, 0);
  shape.lineTo(width, height - cornerRadius);
  shape.absarc(
    width - cornerRadius,
    height - cornerRadius,
    cornerRadius,
    0,
    Math.PI / 2,
    false
  );
  shape.lineTo(cornerRadius, height);
  shape.absarc(
    cornerRadius,
    height - cornerRadius,
    cornerRadius,
    Math.PI / 2,
    Math.PI,
    false
  );
  shape.lineTo(0, 0);

  // Notch shape Cutout /////////////////
  // Left Notch

  const notchShapeLeft = new THREE.Shape();
  notchShapeLeft.moveTo(0, 0);
  notchShapeLeft.lineTo(epsilon + notchDepth, 0);
  notchShapeLeft.lineTo(epsilon + notchDepth, notchHeight);
  notchShapeLeft.lineTo(0, notchHeight);
  notchShapeLeft.lineTo(0, 0);

  // Notch shape Cutout: Right Notch
  const notchShapeRight = new THREE.Path();
  const notchWidth = epsilon + notchDepth;
  const xRight = width - notchWidth;

  notchShapeRight.moveTo(xRight, 0);
  notchShapeRight.lineTo(width, 0);
  notchShapeRight.lineTo(width, notchHeight);
  notchShapeRight.lineTo(xRight, notchHeight);
  notchShapeRight.lineTo(xRight, 0);

  // Add notches to shape as holes
  shape.holes.push(notchShapeLeft);
  shape.holes.push(notchShapeRight);

  // Create geometry and mesh
  const shapeGeometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(shapeGeometry, material);

  return mesh;
}

// Draw the flap shape:
const shape = drawFlap(flapConfig, printConfig);

scene.add(shape);
scene.add(new THREE.BoxHelper(shape, 0xffff00));
// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
