import "./style.css";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 *  SET UP SCENE, CAMERA AND RENDERER
 */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

/**
 *  Lights, Helpers and Grid
 */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xfffffff);
scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

/**
 *  STARS / SPACE
 */

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("./space.jpeg");
scene.background = spaceTexture;

/**
 *  Me
 */
const arshiaTexture = new THREE.TextureLoader().load("arre.png");

const arshia = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: arshiaTexture })
);

arshia.position.z = -5;
arshia.position.x = 35;
arshia.position.y = -15;

scene.add(arshia);

/**
 *  REACT
 */
const reactTexture = new THREE.TextureLoader().load("./react.png");

const reactCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: reactTexture })
);

reactCube.position.z = 10;
reactCube.position.x = -10;
reactCube.position.y = -3;

scene.add(reactCube);

/**
 *  JAVASCRIPT
 */
const jsTexture = new THREE.TextureLoader().load("./javascript.png");

const javascriptCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: jsTexture, color: 0xffffff })
);

javascriptCube.position.z = 20;
javascriptCube.position.x = 10;
javascriptCube.position.y = 2;

scene.add(javascriptCube);

/**
 *  CSS
 */
const cssTexture = new THREE.TextureLoader().load("./css.png");

const cssCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: cssTexture })
);

cssCube.position.z = 20;
cssCube.position.x = -15;
cssCube.position.y = 5;

scene.add(cssCube);

/**
 *  DONUT
 */
const loader = new GLTFLoader();

let doughnut;
loader.load(
  "./DoughNut_FBX.gltf",
  function (loadedModel) {
    doughnut = loadedModel;
    loadedModel.scene.scale.set(0.2, 0.2, 0.2);

    loadedModel.scene.position.z = -25;
    loadedModel.scene.position.x = 0;
    scene.add(loadedModel.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

/**
 *  PROJECT: SPOTIFY
 */
const geometry = new THREE.PlaneGeometry(7.1, 4);
const spotifyTexture = new THREE.TextureLoader().load("./spotify.png");
const spotifyMaterial = new THREE.MeshBasicMaterial({ map: spotifyTexture });
const spotifyProject = new THREE.Mesh(geometry, spotifyMaterial);
spotifyProject.position.z = 20;
spotifyProject.position.x = -5;
spotifyProject.position.y = 6;

scene.add(spotifyProject);

/**
 *  On Scroll Animation
 */

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  arshia.rotation.y += 0.01;
  arshia.rotation.z += 0.01;

  reactCube.rotation.y += 0.01;
  reactCube.rotation.z += 0.01;

  javascriptCube.rotation.y += 0.01;
  javascriptCube.rotation.z += 0.01;

  cssCube.rotation.y += 0.01;
  cssCube.rotation.z += 0.01;

  spotifyProject.rotation.y += 0.01;
  spotifyProject.rotation.z += 0.01;

  if (doughnut) {
    doughnut.scene.rotation.y += 0.01;
    doughnut.scene.rotation.z += 0.01;
  }

  camera.position.z = Math.abs(t * -0.01);
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

/**
 *  Game / Animation Loop
 */

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

animate();

/**
 *  MOON
 */
// const moonTexture = new THREE.TextureLoader().load("./moon.jpeg");
// const nomralTexture = new THREE.TextureLoader().load("./normal.jpeg");

// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: nomralTexture })
// );

// moon.position.z = 20;
// moon.position.x = -10;

// scene.add(moon);

// IN ANIMATE::::
// moon.rotation.x += 0.05;
// moon.rotation.y += 0.075;
// moon.rotation.z += 0.05;

/**
 *  TORUS (RING)
 */
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// const ringTexture = new THREE.TextureLoader().load("2k_jupiter.jpeg");

// const material = new THREE.MeshStandardMaterial({
//   map: ringTexture,
// });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// IN ANIMATE::::
// torus.rotation.x += 0.01;
// torus.rotation.y += 0.005;
// torus.rotation.z += 0.01;
