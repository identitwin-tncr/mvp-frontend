import { useEffect, useState } from "react";
import ContentLayout from "../../components/layout/ContentLayout";
import SimpleCatalogTable from "./components/tables/SimpleCatalogTable";
import { getMaterialsRequest, getMonitoringVariablesRequest } from "../../api/catalogRequests";

const Catalog = () => {

	const [materials, setMaterials] = useState([])
	const [monitoringVariables, setMonitoringVariables] = useState([])

	useEffect(()=>{
		getMaterialsRequest()
		.then((response) => {
			setMaterials(response.items)
		}
		).catch((err)=>{
			console.log(err)
		})
		getMonitoringVariablesRequest()
		.then((response) => {
			setMonitoringVariables(response.items)
		})
	})

	return  (
		<ContentLayout>
			<SimpleCatalogTable items={materials} value1={"Material"} value2={"Código"}/>
			<SimpleCatalogTable items={monitoringVariables} value1={"Variable de monitoreo"} value2={"Siglas"}/>
		</ContentLayout>
	);
};

export default Catalog;
