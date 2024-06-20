import {useEffect, useState} from "react";
import {getInstrumentsRequest} from "../../api/instrumentRequests";
import ContentLayout from "../../components/layout/ContentLayout";
import InstrumentsTable from "./components/InstrumentsTable";
import FormLayout from "../../components/layout/FormLayout";
import {Button, Stack, Typography} from "@mui/material";
import CreateInstrumentForm from "./components/CreateInstrumentForm";
import {useLocation} from "react-router-dom";

const ModifyInstrument = () => {
	const [instrument, setInstrument] = useState({});
	     const location = useLocation();
	
	useEffect(() => {
		setInstrument({
			...instrument,
			...location.state.item
		});
	}, []);
	
	const handleModifyInstrument = () => {
		console.log("Yay")
	}
	
	const handleDeleteInstrument = () => {
		console.log("Yay")
	}
	
	return (
		<FormLayout submitHandler={handleModifyInstrument} layoutWidth={"100%"}>
			<Typography variant="h4" fontWeight="bold">
                Modificar instrumento de medición
            </Typography>
            <Stack sx={{ width: "50%" }} gap={4}>
                <CreateInstrumentForm
                    state={instrument}
                    setState={setInstrument}
                />
				<Stack direction="row" spacing={2}>
					<Button type="submit" variant="contained">
						Modificar
					</Button>
					<Button color="secondary" variant="outlined" onClick={handleDeleteInstrument}>
						Eliminar
					</Button>
				</Stack>
            </Stack>
		</FormLayout>
	);
};

export default ModifyInstrument;