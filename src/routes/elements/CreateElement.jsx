import FormLayout from "../../components/layout/FormLayout";
import {Button, Stack, Typography} from "@mui/material";
import CreateElementForm from "./components/CreateElementForm";
import {useState} from "react";

const CreateElement = () => {
	const [element, setElement] = useState({});
	
	const handleCreateElement = () => {
		console.log("Yay")
	}
	
	return (
		<FormLayout submitHandler={handleCreateElement} layoutWidth={"100%"}>
			<Typography variant="h4" fontWeight="bold">
                Crear nuevo elemento técnico
            </Typography>
            <Stack sx={{ width: "50%" }} gap={4}>
                <CreateElementForm
                    state={element}
                    setState={setElement}
                />
                <Button type="submit" variant="contained">
                    Incluir
                </Button>
            </Stack>
		</FormLayout>
	);
};

export default CreateElement;
