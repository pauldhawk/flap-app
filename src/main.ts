import * as THREE from "three";
import { getConfig } from "./config.ts";
import { drawFlap } from "./shapes/flap.ts";

// Get the global configs
const { flapConfig, printConfig } = getConfig();

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

// Draw the flap shape:
const shape = drawFlap(flapConfig, printConfig);
scene.add(shape);
// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
