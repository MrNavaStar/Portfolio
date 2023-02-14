import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';

let div = document.getElementById("main")

//Create a clock for rotation
const clock = new THREE.Clock()

// Set rotate boolean variable
let rotateModel = true

//Ugh, don't ask about this stuff
let controls

// Creates empty mesh container
const myMesh = new THREE.Mesh();

// Scene
const scene = new THREE.Scene()
scene.background = null

//Lights
const pointLight1 = new THREE.PointLight(0xffffff, 1);
pointLight1.position.set(100, 100, 400);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, .5);
pointLight2.position.set(-500, 100, -400);
scene.add(pointLight2);

//Material
const material = new THREE.MeshStandardMaterial()
material.flatShading = true
material.side = THREE.DoubleSide;

// Camera
const camera = new THREE.PerspectiveCamera(45, div.offsetWidth / div.offsetHeight, 0.1, 2000)

// Renderer
const renderer = new THREE.WebGLRenderer( { alpha: true } );

export let effect;

let characters = ' .:-+*=%@#'
const effectSize = { amount: .175 }
let backgroundColor = '#252a33'
let ASCIIColor = 'white'

export function createEffect() {
  effect = new AsciiEffect(renderer, characters, { invert: false, resolution: effectSize.amount });
  effect.setSize(div.offsetWidth, div.offsetHeight);
  effect.domElement.style.color = ASCIIColor;
  //effect.domElement.style.backgroundColor = backgroundColor;
  div.appendChild(effect.domElement)
}

export function load() {
    new STLLoader().load('./test2.stl', function (geometry) {
        myMesh.material = material;
        myMesh.geometry = geometry;

        var tempGeometry = new THREE.Mesh(geometry, material)
        myMesh.position.copy = (tempGeometry.position)

        geometry.computeVertexNormals();
        myMesh.geometry.center()

        myMesh.rotation.x = -90 * Math.PI / 180;

        myMesh.geometry.computeBoundingBox();
        var bbox = myMesh.geometry.boundingBox;

        myMesh.position.y = ((bbox.max.z - bbox.min.z) / 5)

        camera.position.x = ((bbox.max.x * 4));
        camera.position.y = ((bbox.max.y));
        camera.position.z = ((bbox.max.z * 3));

        scene.add(myMesh);


        controls = new OrbitControls(camera, effect.domElement)


        function tick() {
            if (rotateModel == true) {
                const elapsedTime = clock.getElapsedTime()
                myMesh.rotation.z = (elapsedTime) / 3
                render()
                window.requestAnimationFrame(tick)
            } else {
                render()
                window.requestAnimationFrame(tick)
            }
        }

        function render() {
            effect.render(scene, camera);
        }

        tick()
        }
    )
}

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  effect.setSize(window.innerWidth, window.innerHeight);
}
