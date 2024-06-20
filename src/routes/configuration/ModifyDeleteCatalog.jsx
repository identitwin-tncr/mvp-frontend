import {useEffect, useState} from "react";
import FormLayout from "../../components/layout/FormLayout";
import {Button, Stack, Typography} from "@mui/material";
import CreateCatalogForm from "./components/CreateCatalogForm";
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";

const ModifyDeleteCatalog = ({catalogName}) => {
	 const [catalog, setCatalog] = useState({});
     const location = useLocation();
	
	useEffect(() => {
		setCatalog({
			...catalog,
			...location.state.item
		});
	}, []);
	
	const handleModifyCatalog = () => {
		console.log("Yay")
	}
	
	const handleDeleteCatalog = () => {
		console.log("Yay")
	}
	
	return (
		<FormLayout submitHandler={handleModifyCatalog} layoutWidth={"100%"}>
			<Typography variant="h4" fontWeight="bold">
                Modificar {catalogName}
            </Typography>
            <Stack sx={{ width: "50%" }} gap={4}>
                <CreateCatalogForm
                    state={catalog}
                    setState={setCatalog}
                />
				<Stack direction="row" spacing={2}>
					<Button type="submit" variant="contained">
						Modificar
					</Button>
					<Button color="secondary" variant="outlined" onClick={handleDeleteCatalog}>
						Eliminar
					</Button>
				</Stack>
            </Stack>
		</FormLayout>
	);
};

ModifyDeleteCatalog.propTypes = {
    catalogName: PropTypes.string,
};


export default ModifyDeleteCatalog;
