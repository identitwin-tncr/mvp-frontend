import {useParams} from "react-router-dom";

const AlarmDetail = () => {
	const params = useParams();
	
	return (
		<p>
			<strong>
				Alarm detail {params.id}
			</strong>
		</p>
	);
};

export default AlarmDetail;
