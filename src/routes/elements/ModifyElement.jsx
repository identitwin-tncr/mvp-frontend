import {useParams} from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";

const ModifyElement = () => {
	const params = useParams();
	
	return (
		<ContentLayout>
			<strong>
				Modify Element {params.id}
			</strong>
		</ContentLayout>
	);
};

export default ModifyElement;
