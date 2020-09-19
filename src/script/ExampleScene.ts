import * as THREE from "three";
import path from "path";

export default class ExampleScene {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    textureLoader: THREE.TextureLoader;

    cube: THREE.Mesh;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.textureLoader = new THREE.TextureLoader();

        this.cube = this.createCube();

        this.initScene();
    }

    private initScene() {
        this.camera.position.z = 5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;

        this.scene.add(this.camera);
        this.scene.add(this.cube);
    }

    private createCube() {
        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const texture = this.textureLoader.load(
            path.relative(path.resolve(__dirname, "dist/script"), path.resolve(__dirname, "dist/res/crate.gif"))
        );
        const material = new THREE.MeshBasicMaterial({ map: texture });

        return new THREE.Mesh(geometry, material);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.001;

        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
