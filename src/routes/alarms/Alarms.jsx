import { useEffect, useState } from "react";
import { getAlarmsRequest } from "../../api/alarmRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import AlarmsTable from "./components/AlarmsTable";
import SimpleHeader from "../../components/header/SimpleHeader";

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
			<SimpleHeader title={"Alarmas"}/>
			<AlarmsTable items={alarms}/>
		</ContentLayout>
	);
};

export default Alarms;
