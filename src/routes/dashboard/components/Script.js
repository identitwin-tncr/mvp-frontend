import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

        /* Loaders */
        const glbLoader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(process.env.PUBLIC_URL + "/draco/"); // Asegúrate de que esta ruta sea correcta
        glbLoader.setDRACOLoader(dracoLoader);

        glbLoader.load(
            process.env.PUBLIC_URL + "/model2.glb",
            (gltf) => {
                gltf.scene.traverse((node) => {
                    if (node.isMesh) {
                        // Temporal solution for the color of the model
                        let name = node.name.toString();
                        let color = 0xa1a4a7;
                        let opacity = 1;
                        let transparent = false;
                        console.log(name);

                        if (
                            name.includes("Furniture") ||
                            name.includes("Columns")
                        ) {
                            color = 0xefe7cc;
                        } else if (name.includes("Roof")) {
                            color = 0xff7b85;
                        } else if (name.includes("Furniture")) {
                        } else if (
                            name.includes("Ventana") ||
                            name.includes("arco")
                        ) {
                            color = 0xe0ffff;
                            transparent = true;
                            opacity = 0.5;
                        }

                        node.material = new THREE.MeshStandardMaterial({
                            color: color,
                            roughness: 0.5,
                            metalness: 0.5,
                            opacity: opacity,
                            transparent: transparent,
                        });
                    }
                });
                gltf.scene.scale.set(0.1, 0.1, 0.1);
                this.scene.add(gltf.scene);
            },
            undefined,
            (error) => {
                console.error(
                    "An error occurred while loading the model:",
                    error
                );
            }
        );

        /* Lights */
        const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 2.5);
        light.position.set(0.5, 1, 0.75);
        this.scene.add(light);

        const light2 = new THREE.AmbientLight(0x404040); // soft white light
        this.scene.add(light2);

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

        /* Raycaster and Mouse */
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.hoveredObject = null;

        // Event listener to move camera on click to the position of the pointer
        // window.addEventListener("click", this.onMouseMove.bind(this));
        // window.addEventListener("mousemove", this.onMouseMove.bind(this));
    }

    initScene() {
        document.getElementById("container3D").appendChild(this.container);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    onMouseMove(event) {
        // Calcula la posición del ratón en coordenadas normalizadas del dispositivo (-1 a +1) para ambos componentes.
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Actualiza el raycaster con la cámara y la posición del ratón.
        this.raycaster.setFromCamera(this.mouse, this.camera);

        // Calcula los objetos que intersectan con el rayo.
        const intersects = this.raycaster.intersectObjects(
            this.scene.children,
            true
        );

        if (intersects.length > 0) {
            const object = intersects[0].object;

            if (this.hoveredObject !== object) {
                if (this.hoveredObject) {
                    // Restablece el material del objeto previamente resaltado.
                    this.hoveredObject.material.emissive.setHex(
                        this.hoveredObject.currentHex
                    );
                }

                // Guarda el color actual del objeto.
                this.hoveredObject = object;
                this.hoveredObject.currentHex =
                    this.hoveredObject.material.emissive.getHex();

                // Establece el nuevo color de emisión para el objeto resaltado.
                const currentColor = new THREE.Color(
                    this.hoveredObject.currentHex
                );
                const hsl = {};
                currentColor.getHSL(hsl);
                hsl.l = Math.min(1, hsl.l + 0.1); // Increase lightness by 20%
                const newColor = new THREE.Color().setHSL(hsl.h, hsl.s, hsl.l);
                this.hoveredObject.material.emissive.setHex(newColor.getHex());
            }
        } else {
            if (this.hoveredObject) {
                // Restablece el material del objeto previamente resaltado.
                this.hoveredObject.material.emissive.setHex(
                    this.hoveredObject.currentHex
                );
                this.hoveredObject = null;
            }
        }
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
        window.removeEventListener("click", this.onMouseMove.bind(this));
        window.removeEventListener("mousemove", this.onMouseMove.bind(this));

        this.renderer.setAnimationLoop(null);
        this.container.remove();
    }
}

export { ThreeExperience };
