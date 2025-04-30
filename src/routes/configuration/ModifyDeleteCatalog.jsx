import { useEffect, useState } from "react";
import FormLayout from "../../components/layout/FormLayout";
import { Button, Stack, Typography, Box, IconButton } from "@mui/material";
import CreateCatalogForm from "./components/CreateCatalogForm";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ModifyDeleteCatalog = ({ catalogName }) => {
	// TODO: Estructurado de acuerdo con "data" en MaterialsCatalog, debe de cambiarse 
	// TODO: para que se ajuste a lo devuelto por el backend 
	const navigate = useNavigate();
	const [catalog, setCatalog] = useState({
		material: "",
		codigo: "",
		variables: [],
	});
	const location = useLocation();

	// TODO: Igualmente
	useEffect(() => {
		if (location.state && location.state.element) {
			setCatalog(location.state.element);
		}
	}, [location]);

	// TODO: Agregar funcionalidad para editar catalogo
	const handleModifyCatalog = () => {
		console.log("Datos a modificar:", catalog);
	}

	// TODO: Agregar funcionalidad para borrar catalogo
	const handleDeleteCatalog = () => {
		console.log("Elemento a eliminar:", catalog.id);
	}

	return (
		<FormLayout submitHandler={handleModifyCatalog} layoutWidth={"100%"}>
			<Box display="flex" alignItems="center" mb={4}>
                <IconButton
                    onClick={() => navigate(-1)}
                    sx={{
                        marginRight: 2,
                        color: "#143846",
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold">
                    Editar {catalogName}
                </Typography>
            </Box>
			<Stack gap={4}>
				<CreateCatalogForm state={catalog} setState={setCatalog} />
				<Stack direction="row" spacing={2} justifyContent="flex-start">
					<Button type="submit" variant="contained" color="primary">
						Guardar Cambios
					</Button>
					<Button
						color="secondary"
						variant="outlined"
						onClick={handleDeleteCatalog}
					>
						Eliminar
					</Button>
				</Stack>
			</Stack>
		</FormLayout>
	);
};

ModifyDeleteCatalog.propTypes = {
	catalogName: PropTypes.string.isRequired,
};


export default ModifyDeleteCatalog;
