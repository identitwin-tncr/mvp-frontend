import * as THREE from "three";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { CustomPointerLockControls } from "./CustomControll";

const clock = new THREE.Clock();

class ThreeExperience {
    constructor() {
        this.container = document.createElement("div");
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        /* Camera */
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 3, 0);

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

        // Event listener to move camera on click to the position of the pointer
        this.renderer.domElement.addEventListener(
            "contextmenu",
            (event) => {
                event.preventDefault();

                this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                // Actualizar el Raycaster con la cámara y la posición del mouse
                this.raycaster.setFromCamera(this.mouse, this.camera);

                // Calcular los objetos que intersectan con el rayo
                const intersects = this.raycaster.intersectObjects(
                    this.scene.children
                );

                if (intersects.length > 0) {
                    // Mover la cámara a la posición del primer objeto intersectado
                    const intersect = intersects[0];
                    this.camera.position.copy(intersect.point);
                    this.camera.position.y = 3;
                }
            },
            false
        );

        // OrbitControls
        this.controls = new CustomPointerLockControls(
            this.camera,
            this.renderer.domElement
        );

        this.renderer.domElement.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                // Verificar si es el botón izquierdo del mouse
                this.controls.lock();
            }
        });

        this.controls.addEventListener("lock", () => {
            this.controls.enabled = true;
        });

        this.controls.addEventListener("unlock", () => {
            this.controls.enabled = false;
        });

        this.renderer.domElement.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                // Verificar si es el botón izquierdo del mouse
                this.controls.unlock();
            }
        });
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
            }
        });
    }
}

export { ThreeExperience };
