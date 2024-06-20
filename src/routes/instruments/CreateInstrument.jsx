import {useState} from "react";
import FormLayout from "../../components/layout/FormLayout";
import {Button, Stack, Typography} from "@mui/material";
import CreateInstrumentForm from "./components/CreateInstrumentForm";

const CreateInstrument = () => {
	const [instrument, setInstrument] = useState({});
	
	const handleCreateElement = () => {
		console.log("Yay")
	}
	
	return (
		<FormLayout submitHandler={handleCreateElement} layoutWidth={"100%"}>
			<Typography variant="h4" fontWeight="bold">
                Crear nuevo instrumento de medición
            </Typography>
            <Stack sx={{ width: "50%" }} gap={4}>
                <CreateInstrumentForm
                    state={instrument}
                    setState={setInstrument}
                />
                <Button type="submit" variant="contained">
                    Incluir
                </Button>
            </Stack>
		</FormLayout>
	);
};

export default CreateInstrument;
