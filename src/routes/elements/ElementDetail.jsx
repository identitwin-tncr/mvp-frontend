import {useParams} from "react-router-dom";

const ElementDetail = () => {
	const params = useParams();
	return (
		<p>
			<strong>
				Element Detail {params.id}
			</strong>
		</p>
	);
};

export default ElementDetail;
