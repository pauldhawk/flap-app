import * as THREE from "three";
import { getConfig } from "./config.ts";
import { FlapConfig } from "./schema.ts";
const { flapConfig, spoolConfig } = getConfig();

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

export function createRoundedSquareShape(flapConfig: FlapConfig): any {
  const shape = new THREE.Shape();

  const w = flapConfig.width;
  const h = flapConfig.height;
  const r = flapConfig.cornerRadius;

  shape.moveTo(0, 0); // bottom-left
  shape.lineTo(w, 0); // left side
  // notch out top left corner for radius
  shape.lineTo(w, h - r);
  shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false);

  shape.lineTo(r, h); //  **
  shape.absarc(r, h - r, r, Math.PI / 2, Math.PI, false);

  // Close the shape
  shape.lineTo(0, 0);

  const shapeGeometry = new THREE.ShapeGeometry(shape);
  const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xff9900 });
  const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
  return shapeMesh;
}

// Example usage (if running in a browser scene setup):
const shape = createRoundedSquareShape(flapConfig);
// Create the first circle
const circleGeometry1 = new THREE.CircleGeometry(flapConfig.cornerRadius, 64);
const circleMaterial1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green
const circle1 = new THREE.Mesh(circleGeometry1, circleMaterial1);
circle1.position.x = flapConfig.cornerRadius;
circle1.position.y = flapConfig.height - flapConfig.cornerRadius;

// Create the second circle
const circleGeometry2 = new THREE.CircleGeometry(flapConfig.cornerRadius, 64);
const circleMaterial2 = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue
const circle2 = new THREE.Mesh(circleGeometry2, circleMaterial2);
circle2.position.x = flapConfig.width - flapConfig.cornerRadius;
circle2.position.y = flapConfig.height - flapConfig.cornerRadius;
// const unionResult = CSG.union(shape, circle1);

// const mesh = new THREE.Mesh(geometry, material);
scene.add(shape);
// scene.add(circle1);
// scene.add(circle2);
// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
