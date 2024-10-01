import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

class ThreeExperience {
    constructor() {
        this.dragStart = { x: 0, y: 0 };
        this.container = document.createElement("div");

        /* Camera */
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 15, 0);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);

        this.scene.fog = new THREE.Fog(0x000000, 0, 750);
        this.scene.add(this.camera);

        /* Renderer */
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.setAnimationLoop(this.render.bind(this));
        this.container.appendChild(this.renderer.domElement);

        /* Loaders */
        const fbxLoader = new FBXLoader();
        fbxLoader.load(process.env.PUBLIC_URL + "/House.fbx", (object) => {
            object.scale.set(0.01, 0.01, 0.01);
            this.scene.add(object);
        });

        /* Lights */
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
        light.position.set(0.5, 1, 0.75);
        this.scene.add(light);

        /* Resize */
        window.addEventListener("resize", this.resize.bind(this));

        /* Orbit Controls */
        const controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enablePan = false;
        controls.maxPolarAngle = Math.PI / 2;
    }

    initScene() {
        document.getElementById("container3D").appendChild(this.container);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        const { clientWidth: width, clientHeight: height } =
            document.getElementById("container3D");
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    cleanUp() {
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material.dispose();
                child.geometry.dispose();
            }
        });

        document.getElementById("container3D").removeChild(this.container);
    }
}

export { ThreeExperience };
