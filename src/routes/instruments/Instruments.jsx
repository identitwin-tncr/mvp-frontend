import { useEffect, useState } from "react";
import { getInstrumentsRequest } from "../../api/instrumentRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import InstrumentsTable from "./components/InstrumentsTable";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import {useNavigate} from "react-router-dom";

const Instruments = () => {
	const [instruments, setInstruments] = useState([]);
	const navigate = useNavigate();

	useEffect(()=>{
		getInstrumentsRequest()
		.then((response) => {
			setInstruments(response.items)
		}
		).catch((err)=>{
			console.log(err)
		})
	})

	return  (
		<ContentLayout>
			<SingleButtonHeader buttonLabel={"Agregar instrumento"} buttonOnClickHandler={() => navigate("/instrumentos/crear")} title={"Instrumentos de medición"} />
			<InstrumentsTable items={instruments}/>
		</ContentLayout>
	);
};

export default Instruments;
