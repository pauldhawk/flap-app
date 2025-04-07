import * as THREE from "three";
import { FlapConfig, PrintConfig } from "../schema";

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
