import React, { useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Model } from "./components/Model";

const Dashboard = () => {
    const [visibleModel, setVisibleModel] = useState(0);

    const [cameraMode, setCameraMode] = useState("default");

    const cameraRef = useRef();
    const controlsRef = useRef();

    const handleChangeModel = (num) => {
        setVisibleModel(num);
    };

    const handleRightClick = (event) => {
        if (cameraMode !== "default") {
            return;
        }
        cameraRef.current.position.set(-4, 8, 1.3);
        controlsRef.current.target.set(-4, 7, 1.3);
        controlsRef.current.minPolarAngle = Math.PI / 3;
        controlsRef.current.maxPolarAngle = (2 * Math.PI) / 3;
        controlsRef.current.enableZoom = false;
        controlsRef.current.rotateSpeed = 0.3;

        setCameraMode("top");
    };

    const showPopup = (name, info) => {
        alert(
            `Hiciste click en el componente ${name} con la siguiente información: ${info}`
        );
    };

    return (
        <div id="canvas-container">
            <Canvas>
                <color attach="background" args={["#dddddd"]} />

                <ambientLight intensity={0.8} />

                <PerspectiveCamera
                    makeDefault
                    position={[-33, 33, 33]}
                    ref={cameraRef}
                />

                <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    enableDamping={true}
                    rotateSpeed={0.5}
                    zoomSpeed={1.2}
                    screenSpacePanning={true}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 5}
                    target={[0, 7, 0]}
                    ref={controlsRef}
                />

                {visibleModel === 0 && (
                    <Model
                        color={0xdddddd}
                        onContextMenu={handleRightClick}
                        onComponentClick={showPopup}
                    />
                )}
                {visibleModel === 1 && (
                    <Model
                        color={0x73c99b}
                        onContextMenu={handleRightClick}
                        onComponentClick={showPopup}
                    />
                )}
                {visibleModel === 2 && (
                    <Model
                        color={0x4287f5}
                        onContextMenu={handleRightClick}
                        onComponentClick={showPopup}
                    />
                )}
            </Canvas>
            <div>
                <button
                    onClick={() => handleChangeModel(0)}
                    style={{
                        position: "absolute",
                        top: "100px",
                        left: "100px",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12" />{" "}
                        <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />{" "}
                        <path d="M8 18v-12a2 2 0 1 0 -4 0v12" />{" "}
                    </svg>
                </button>
                <button
                    onClick={() => handleChangeModel(1)}
                    style={{
                        position: "absolute",
                        top: "100px",
                        left: "200px",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#73c99b"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12" />{" "}
                        <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />{" "}
                        <path d="M8 18v-12a2 2 0 1 0 -4 0v12" />{" "}
                    </svg>
                </button>
                <button
                    onClick={() => handleChangeModel(2)}
                    style={{
                        position: "absolute",
                        top: "100px",
                        left: "300px",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4287f5"
                        strokeWidth={1.75}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        {" "}
                        <path d="M8 6h10a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-12" />{" "}
                        <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />{" "}
                        <path d="M8 18v-12a2 2 0 1 0 -4 0v12" />{" "}
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
