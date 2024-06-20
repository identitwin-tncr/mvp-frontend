import { useEffect, useState } from "react";
import { getAlarmsRequest } from "../../api/alarmRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import AlarmsTable from "./components/AlarmsTable";

const Alarms = () => {
	const [alarms, setAlarms] = useState([])

	useEffect(()=>{
		getAlarmsRequest()
		.then((response) => {
			setAlarms(response.items)
		}
		).catch((err)=>{
			console.log(err)
		})
	})
	return (
		<ContentLayout>
			<AlarmsTable items={alarms}/>
		</ContentLayout>
	);
};

export default Alarms;
