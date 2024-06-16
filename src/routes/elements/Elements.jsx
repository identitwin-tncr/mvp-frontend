import { useEffect, useState } from "react";
import { getElementsRequest } from "../../api/elementRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import ElementsTable from "./components/ElementsTable";

const Elements = () => {
	const [elements, setElements] = useState([])

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
			<p>
				<ElementsTable items={elements}/>
			</p>
		</ContentLayout>
	);
};

export default Elements;
