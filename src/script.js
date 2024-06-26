import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as lil from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
/**
 * Base
 */
// Debug
const gui = new lil.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapMaterial = textureLoader.load("textures/matcaps/7.png");
/*
 *    Fonts
 */

const fontLoader = new FontLoader();

fontLoader.load("./fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Team Pixel Pirates(TPP)", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.center();
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapMaterial });

  const TextMesh = new THREE.Mesh(textGeometry, textMaterial);
  scene.add(TextMesh);
  const DonutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const DonutMaterial = new THREE.MeshNormalMaterial();

  for (let i = 0; i < 200; i++) {
    const DonutMesh = new THREE.Mesh(DonutGeometry, DonutMaterial);

    scene.add(DonutMesh);

    DonutMesh.position.x = (Math.random() - 0.5) * 10;
    DonutMesh.position.y = (Math.random() - 0.5) * 10;
    DonutMesh.position.z = (Math.random() - 0.5) * 10;

    DonutMesh.rotation.x = Math.random() * Math.PI;
    DonutMesh.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    DonutMesh.scale.set(scale, scale, scale);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
