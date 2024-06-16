import { useEffect, useState } from "react";
import { getInstrumentsRequest } from "../../api/instrumentRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import InstrumentsTable from "./components/InstrumentsTable";

const Instruments = () => {
	const [instruments, setInstruments] = useState([])

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
			<InstrumentsTable items={instruments}/>
		</ContentLayout>
	);
};

export default Instruments;
