import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

import { useLoader } from '@react-three/fiber'

const TNCRModel = () => {
	const model = useLoader(FBXLoader, "src/static/TNCR_COMPLETO_20230523.fbx");

	return (
		<primitive object={model.scene}/>
	)
}

export default TNCRModel;
