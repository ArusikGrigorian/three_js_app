import * as THREE from "/node_modules/three/build/three.module.js";
import { FontLoader } from "../vendor_mods/three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "../vendor_mods/three/examples/jsm/geometries/TextGeometry.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1500);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.125);
const pointLight = new THREE.PointLight(0xffffff, 1.5);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const loader = new FontLoader();
let geometry;
let material;
let mesh;

camera.position.set(150, 0, 250);
directionalLight.position.set(100, 100, 1).normalize();
pointLight.position.set(0, -100, 150);
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xe9e9e9, 1);
document.body.appendChild(renderer.domElement);
loader.load("/node_modules/three/examples/fonts/helvetiker_bold.typeface.json", function (font) {
  geometry = new TextGeometry("Hello there !", {
    font: font,
    size: 40,
    height: 5,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 3,
    bevelSize: 3,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  material = new THREE.MeshPhongMaterial({ color: 0x6688ff });
  mesh = new THREE.Mesh(geometry, material);

  scene.add(directionalLight);
  scene.add(pointLight);
  scene.add(mesh);
});

(function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  renderer.render(scene, camera);
})();
