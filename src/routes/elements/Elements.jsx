import { useEffect, useState } from "react";
import { getElementsRequest } from "../../api/elementRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import ElementsTable from "./components/ElementsTable";
import {Typography} from "@mui/material";
import SingleButtonHeader from "../../components/header/SimpleButtonHeader";
import {useNavigate} from "react-router-dom";

const Elements = () => {
	const [elements, setElements] = useState([]);
	const navigate = useNavigate();

	useEffect(()=>{
		getElementsRequest()
		.then((response) => {
			setElements(response.items)
		}
		).catch((err)=>{
			console.log(err)
		})
	})


	return  (
		<ContentLayout>
			<SingleButtonHeader buttonLabel={"Agregar elemento"} buttonOnClickHandler={() => navigate("/elementos/crear")} title={"Elementos técnicos"} />
			<ElementsTable items={elements}/>
		</ContentLayout>
	);
};

export default Elements;
