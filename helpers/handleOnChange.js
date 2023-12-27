import * as THREE from "/node_modules/three/build/three.module.js";

export function handleOnChange(e, mesh, shape, scene, camera, renderer) {
  mesh.geometry.dispose();
  mesh.geometry = new THREE.PlaneGeometry(shape.geo.width, shape.geo.height, shape.geo.widthSegments, shape.geo.heightSegments);
  const geometryPositionArray = mesh.geometry.attributes.position.array;

  for (let i = 0; i < geometryPositionArray.length; i += 3) {
    geometryPositionArray[i + 2] += Math.random();
  }

  const colors = [];
  const count = mesh.geometry.attributes.position.count;

  for (let i = 0; i < count; i++) {
    colors.push(0, 0.19, 0.4);
  }

  mesh.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));

  renderer.render(scene, camera);
}
