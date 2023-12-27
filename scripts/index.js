import * as THREE from "/node_modules/three/build/three.module.js";
import * as DAT from "/node_modules/dat.gui/build/dat.gui.module.js";
import { OrbitControls } from "../vendor_mods/three/examples/jsm/controls/OrbitControls.js";
import { guiAdd } from "../helpers/guiAdd.js";
import { handleOnResize } from "../helpers/handleOnResize.js";

// initializing the scene, camera, light, raycaster and renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 45;

const light = new THREE.DirectionalLight(0xffffff, 1);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, -1, 1);
backLight.position.set(0, 0, -1);

const raycaster = new THREE.Raycaster();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0x2, 1);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// initializing the geometry [figure], making it non-flat and animating [rotating]

const geometry = new THREE.PlaneGeometry(300, 300, 50, 50);
const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, flatShading: true, vertexColors: true });
const mesh = new THREE.Mesh(geometry, material);
const geometryPositionArray = mesh.geometry.attributes.position.array;

for (let i = 0; i < geometryPositionArray.length; i += 3) {
  geometryPositionArray[i] += Math.random() * 5 - 0.5;
  geometryPositionArray[i + 1] += Math.random() * 5 - 0.5;
  geometryPositionArray[i + 2] += Math.random() * 5;
  renderer.render(scene, camera);
}

const colors = [];
const count = mesh.geometry.attributes.position.count;

for (let i = 0; i < count; i++) {
  colors.push(0, 0.19, 0.4);
}

mesh.geometry.setAttribute("color", new THREE.BufferAttribute(new Float32Array(colors), 3));

const mouse = {
  x: null,
  y: null,
};

addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -((e.clientY / innerHeight) * 2 - 1);

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(mesh);

  if (intersects.length > 0) {
    const color = intersects[0].object.geometry.attributes.color;
    const faceLetters = ["a", "b", "c"];
    const initialColors = { r: 0, g: 0.19, b: 0.4 };
    const hoverColors = { r: 0.1, g: 0.5, b: 1 };

    gsap.to(hoverColors, {
      r: initialColors.r,
      g: initialColors.g,
      b: initialColors.b,
      duration: 1,
      onUpdate: () => {
        faceLetters.forEach((letter) => {
          color.setX(intersects[0].face[letter], hoverColors.r);
          color.setY(intersects[0].face[letter], hoverColors.g);
          color.setZ(intersects[0].face[letter], hoverColors.b);
        });

        color.needsUpdate = true;
      },
    });
  }
});

let frame = 0;

(function animate() {
  requestAnimationFrame(animate);
  frame += 0.05;

  for (let i = 0; i < geometryPositionArray.length; i += 3) {
    geometryPositionArray[i] += Math.cos(frame + Math.random() * Math.PI * 5) * 0.03;
    geometryPositionArray[i + 1] += Math.sin(frame + Math.random() * Math.PI * 5) * 0.01;
  }

  mesh.geometry.attributes.position.needsUpdate = true;
  controls.update();
  renderer.render(scene, camera);
})();

// appending the canvas to the body and rendering the scene

document.body.appendChild(renderer.domElement);
window.addEventListener("resize", (e) => handleOnResize(e, renderer, camera));
scene.add(mesh);
scene.add(light);
scene.add(backLight);
renderer.render(scene, camera);

// initializing GUI

const gui = new DAT.GUI();
const shape = { geo: { width: 400, height: 400, widthSegments: 50, heightSegments: 50 } };
const params = {
  gui,
  metricsObject: shape.geo,
  metricsArray: ["width", "height", "widthSegments", "heightSegments"],
  start: 1,
  end: 60,
  onChangeParams: [mesh, shape, scene, camera, renderer],
};

guiAdd(params);
