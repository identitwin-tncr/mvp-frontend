import {useParams} from "react-router-dom";
import ContentLayout from "../../components/layout/ContentLayout";

const AlarmDetail = () => {
	const params = useParams();
	
	return (
		<ContentLayout>
			<p>
				<strong>
					Alarm detail {params.id}
				</strong>
			</p>
		</ContentLayout>
	);
};

export default AlarmDetail;
