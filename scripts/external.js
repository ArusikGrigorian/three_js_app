import * as THREE from "/node_modules/three/build/three.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 45);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-100, 100, 100);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);

const geometry = new THREE.SphereGeometry(15, 50, 50);
const material = new THREE.MeshPhongMaterial({ color: "#6699ee" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
scene.add(spotLight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.render(scene, camera);
});
