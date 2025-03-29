import * as THREE from "three";
import "./style.css";

// Create the scene
const scene: THREE.Scene = new THREE.Scene();

// Create the camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create the renderer
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube mesh
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial();
const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Animate the scene
const animate = (): void => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
