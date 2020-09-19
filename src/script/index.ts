import ExampleScene from "./ExampleScene";

const scene = new ExampleScene();
scene.animate();

window.addEventListener("resize", scene.resize.bind(scene));
document.body.appendChild(scene.renderer.domElement);
