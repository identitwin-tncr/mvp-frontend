import ContentLayout from "../../components/layout/ContentLayout";
import {Canvas} from "@react-three/fiber";
import Box from "./components/Box";
import TNCRModel from "./components/TNCRModel";

const Dashboard = () => {
	return (
		<ContentLayout>
			<Canvas>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
				<Box position={[-5, 0, 0]} />
				<Box position={[-3, 0, 0]} />
				<Box position={[-1, 0, 0]} />
				<Box position={[1, 0, 0]} />
				<Box position={[3, 0, 0]} />
				<Box position={[5, 0, 0]} />
			</Canvas>
			{/*<Canvas>*/}
			{/*	<ambientLight intensity={Math.PI / 2} />*/}
			{/*	<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />*/}
			{/*	<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />*/}
			{/*	<TNCRModel />*/}
			{/*</Canvas>*/}
		</ContentLayout>
	);
};

export default Dashboard;
