import { useEffect } from "react";
import { ThreeExperience } from "./Script";

export default function Scene() {
    const three = new ThreeExperience();

    useEffect(() => {
        three.initScene();
        return () => {
            three.cleanUp();
            console.log("first");
        };
    }, []);

    function switchModel(model) {
        return () => {
            three.switchModel(model);
        };
    }

    return (
        <>
            <div id="container3D" className="scene_container"></div>
            <button onClick={switchModel(1)}>Model 1</button>
            <button onClick={switchModel(2)}>Model 2</button>
            <button onClick={switchModel(3)}>Model 3</button>
        </>
    );
}
