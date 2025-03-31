import * as THREE from "three";
import { get_config } from "./config.ts";
const { characters, flap_config, font_config, spool_config } = get_config();
console.log(characters);
console.log(flap_config);
console.log(font_config);
console.log(spool_config);

const flap_width = 100;
const flap_height = 150;
const shapePadding = 100;
const flap_corner_radius = 10;
const zThickness = 1;
// Set up scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -shapePadding, // left
  flap_width + shapePadding, // right
  flap_height + shapePadding, // top
  -shapePadding, // bottom
  0.1,
  1000
);

// 2. Move the camera slightly forward so it can see the mesh
camera.position.z = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const baseShape = new THREE.Shape();
baseShape.moveTo(0, 0);
baseShape.lineTo(flap_width, 0);
baseShape.lineTo(flap_width, flap_height);
baseShape.lineTo(0, flap_height);
baseShape.lineTo(0, 0);

// Convert shape to geometry and mesh
const baseGeometry = new THREE.ShapeGeometry(baseShape);
const baseMaterial = new THREE.MeshBasicMaterial({
  color: 0x0077ff,
  side: THREE.DoubleSide,
});
const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);

scene.add(baseMesh);
const circleSegments = 40;
const circleMaterial = new THREE.MeshBasicMaterial({
  color: 0xff9900,
  side: THREE.DoubleSide,
});
// Left circle
const leftCircleGeometry = new THREE.CircleGeometry(
  flap_corner_radius,
  circleSegments
);
const leftCircleMesh = new THREE.Mesh(leftCircleGeometry, circleMaterial);
leftCircleMesh.position.set(
  flap_corner_radius,
  flap_height - flap_corner_radius,
  0
);
scene.add(leftCircleMesh);

// Right circle
const rightCircleGeometry = new THREE.CircleGeometry(
  flap_corner_radius,
  circleSegments
);
const rightCircleMesh = new THREE.Mesh(rightCircleGeometry, circleMaterial);
rightCircleMesh.position.set(
  flap_width - flap_corner_radius,
  flap_height - flap_corner_radius,
  0
);
scene.add(rightCircleMesh);
// scene.add(hullMesh);
// scene.add(flapMesh);
/*
const circleGeo = new THREE.CircleGeometry(flap_corner_radius, 40);
circleGeo.translate(flap_corner_radius, flap_height - flap_corner_radius, 0);
const leftCircle = new THREE.Mesh(circleGeo);




const rightCircleGeo = circleGeo.clone();
rightCircleGeo.translate(flap_width - 2 * flap_corner_radius, 0, 0);
const rightCircle = new THREE.Mesh(rightCircleGeo);

// Create the hull by combining the two circles and taking their convex hull
const hullCircles = CSG.union(leftCircle, rightCircle);

// Extrude the base rectangle into a shape
const baseShapeMesh = new THREE.Mesh(new THREE.ShapeGeometry(baseShape));

// Combine base and rounded corners
const baseWithCorners = CSG.union(baseShapeMesh, hullCircles);

// Create notches
const notch1Geo = new THREE.BoxGeometry(
  eps + flap_notch_depth,
  flap_notch_height,
  1
);
notch1Geo.translate(
  -eps / 2 + (eps + flap_notch_depth) / 2,
  flap_pin_width + flap_notch_height / 2,
  0
);
const notch1 = new THREE.Mesh(notch1Geo);

const notch2Geo = new THREE.BoxGeometry(
  eps + flap_notch_depth,
  flap_notch_height,
  1
);
notch2Geo.translate(
  flap_width - flap_notch_depth + (eps + flap_notch_depth) / 2,
  flap_pin_width + flap_notch_height / 2,
  0
);
const notch2 = new THREE.Mesh(notch2Geo);

// Subtract notches from base
const finalFlap = CSG.subtract(baseWithCorners, CSG.union(notch1, notch2));

// Position final flap with translation
finalFlap.position.set(0, -flap_pin_width / 2, 0);

// Add to scene
scene.add(finalFlap);
*/

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
