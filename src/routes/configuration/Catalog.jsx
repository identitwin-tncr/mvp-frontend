import { useEffect, useState } from "react";
import ContentLayout from "../../components/layout/ContentLayout";
import SimpleCatalogTable from "./components/tables/SimpleCatalogTable";
import { getMaterialsRequest, getMonitoringVariablesRequest } from "../../api/catalogRequests";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import {useNavigate} from "react-router-dom";

const Catalog = () => {

	const [materials, setMaterials] = useState([])
	const [monitoringVariables, setMonitoringVariables] = useState([])
	
	const navigate = useNavigate();

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
			<SingleButtonHeader buttonLabel={"Agregar material"} buttonOnClickHandler={() => navigate("/configuracion/materiales/crear")} title={"Materiales"} />
			<SimpleCatalogTable items={materials} value1={"Material"} value2={"Código"} catalogName={"materiales"}/>
			<SingleButtonHeader buttonLabel={"Agregar variable"} buttonOnClickHandler={() => navigate("/configuracion/variables/crear")} title={"Variables de monitoreo"} />
			<SimpleCatalogTable items={monitoringVariables} value1={"Variable de monitoreo"} value2={"Siglas"} catalogName={"variables"}/>
		</ContentLayout>
	);
};

export default Catalog;
