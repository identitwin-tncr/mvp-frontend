import {useState} from "react";
import FormLayout from "../../components/layout/FormLayout";
import {Button, Stack, Typography} from "@mui/material";
import PropTypes from "prop-types";
import CreateCatalogForm from "./components/CreateCatalogForm";

const CreateCatalog = ({catalogName}) => {
	const [catalog, setCatalog] = useState({});
	
	const handleCreateCatalog = () => {
		console.log("Yay")
	}
	
	return (
		<FormLayout submitHandler={handleCreateCatalog} layoutWidth={"100%"}>
			<Typography variant="h4" fontWeight="bold">
                Crear {catalogName}
            </Typography>
            <Stack sx={{ width: "50%" }} gap={4}>
                <CreateCatalogForm
                    state={catalog}
                    setState={setCatalog}
                />
                <Button type="submit" variant="contained">
                    Incluir
                </Button>
            </Stack>
		</FormLayout>
	);
};

CreateCatalog.propTypes = {
    catalogName: PropTypes.string,
};


export default CreateCatalog;
