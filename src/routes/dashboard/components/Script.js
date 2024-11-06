import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const INSIDE_MODEL_POSITION = new THREE.Vector3(0, 0.8, 0);

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
        this.camera.position.set(-2, 2, 2);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xdddddd);

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

        // Cargar los modelos
        const glbLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(process.env.PUBLIC_URL + "/draco/"); // Asegúrate de que esta ruta sea correcta
        glbLoader.setDRACOLoader(dracoLoader);

        this.model1 = null;
        this.model2 = null;
        this.model3 = null;
        let currentModel;

        glbLoader.load(process.env.PUBLIC_URL + "/model2.glb", (gltf) => {
            let model = gltf.scene;

            model.traverse((node) => {
                if (node.isMesh) {
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0x00ff00,
                        roughness: 0.5,
                        metalness: 0.5,
                        opacity: 0.5,
                        transparent: true,
                    });
                }
            });
            model.scale.set(0.1, 0.1, 0.1);
            if (!currentModel) {
                this.model1 = model.clone();
                this.switchModel(1);
            }
        });

        glbLoader.load(process.env.PUBLIC_URL + "/model2.glb", (gltf) => {
            let model = gltf.scene;

            model.traverse((node) => {
                if (node.isMesh) {
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0xff0000,
                        roughness: 0.5,
                        metalness: 0.5,
                        opacity: 0.5,
                        transparent: true,
                    });
                }
            });
            model.scale.set(0.1, 0.1, 0.1);
            this.model2 = model.clone();
        });

        glbLoader.load(process.env.PUBLIC_URL + "/model2.glb", (gltf) => {
            let model = gltf.scene;
            model.traverse((node) => {
                if (node.isMesh) {
                    node.material = new THREE.MeshStandardMaterial({
                        color: 0x0000ff,
                        roughness: 0.5,
                        metalness: 0.5,
                        opacity: 0.5,
                        transparent: true,
                    });
                }
            });
            model.scale.set(0.1, 0.1, 0.1);
            this.model3 = model.clone();
        });

        /* Lights */
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
        light.position.set(0.5, 1, 0.75);
        this.scene.add(light);

        const light2 = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light2);

        /* Resize */
        window.addEventListener("resize", this.resize.bind(this));

        /* Event Listeners */
        this.onMouseClickHandler = this.onMouseClick.bind(this);

        /* Orbit Controls */
        this.setOrbitControls();

        /* Raycaster and Mouse */
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredObject = null;

        // Event listener to move camera on click to the position of the pointer
        // window.addEventListener("click", this.onMouseMove.bind(this));
        // window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    // Three Experience Methods //
    initScene() {
        document.getElementById("container3D").appendChild(this.container);
    }

    switchModel(index) {
        switch (index) {
            case 1:
                if (this.currentModel === this.model1) {
                    return;
                }
                if (this.model1 === null) {
                    return;
                }
                this.scene.remove(this.currentModel);
                this.currentModel = this.model1.clone();
                this.scene.add(this.currentModel);

                break;
            case 2:
                if (this.currentModel === this.model2) {
                    return;
                }
                if (this.model2 === null) {
                    return;
                }
                this.scene.remove(this.currentModel);
                this.currentModel = this.model2.clone();
                this.scene.add(this.currentModel);

                break;
            case 3:
                if (this.currentModel === this.model3) {
                    return;
                }
                if (this.model3 === null) {
                    return;
                }
                this.scene.remove(this.currentModel);
                this.currentModel = this.model3.clone();
                this.scene.add(this.currentModel);

                break;
            default:
                break;
        }
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
        window.removeEventListener("resize", this.resize.bind(this));
        this.renderer.setAnimationLoop(null);
        this.container.remove();
    }

    onMouseClick(event) {
        // Update the mouse variable with normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update the raycaster with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Calculate objects intersecting the ray
        const intersects = this.raycaster.intersectObjects(
            this.scene.children,
            true
        );

        if (intersects.length > 0) {
            // Get the first intersected object
            const intersect = intersects[0];

            // Log the intersected object or perform any action
            console.log("Intersected object:", intersect.object);

            // Move the camera to a specific position inside the model
            const targetPosition = INSIDE_MODEL_POSITION; // Change this to the desired position inside the model
            this.camera.position.copy(targetPosition);

            // Update the camera's target to look at the intersected object
            this.camera.lookAt(intersect.point);

            this.controls.dispose(); // Dispose of the current controls

            // Change the controls to PointerLockControls
            this.setPointerLockControls();
        }
    }

    // Set Controls Methods //
    setOrbitControls() {
        if (this.controls) this.controls.dispose(); // Dispose of the current controls

        // Change the controls to OrbitControls
        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        // Add event listeners for the controls
        window.addEventListener("contextmenu", this.onMouseClickHandler);
    }

    setPointerLockControls() {
        this.controls.dispose(); // Dispose of the current controls
        // Change the controls to PointerLockControls
        this.controls = new PointerLockControls(
            this.camera,

            this.renderer.domElement
        );

        // Add event listeners for the controls
        window.removeEventListener("contextmenu", this.onMouseClickHandler);

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
                    this.camera.position.y = 0.8;
                }
            },
            false
        );
    }
}

export { ThreeExperience };
