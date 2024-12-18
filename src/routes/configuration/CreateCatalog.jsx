import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLayout from "../../components/layout/FormLayout";
import { Button, Stack, Typography, Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CreateCatalogForm from "./components/CreateCatalogForm";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CreateCatalog = ({ catalogName }) => {
    const navigate = useNavigate();

    const [catalog, setCatalog] = useState({
        material: "",
        codigo: "",
        variables: [
            { nombre: "Temperatura", unidad: "", rangoMinimo: 0, rangoMaximo: 0 },
            { nombre: "Luz", unidad: "", rangoMinimo: 0, rangoMaximo: 0 },
            { nombre: "Particulas de CO2", unidad: "", rangoMinimo: 0, rangoMaximo: 0 },
            { nombre: "Humedad", unidad: "", rangoMinimo: 0, rangoMaximo: 0 },
        ],
    });

    // TODO: llamar fucion respectiva del API para crear catalogo
    const handleCreateCatalog = () => {
        console.log("Datos del catálogo a crear:", catalog);
    }

    const handleCancelCatalog = () => {
        navigate(-1);
    }

    return (
        <FormLayout submitHandler={handleCreateCatalog} layoutWidth={"100%"}>
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
                    Crear {catalogName}
                </Typography>
            </Box>
            <Stack gap={4}>
                <CreateCatalogForm
                    state={catalog}
                    setState={setCatalog}
                    showVariables={true}
                />
                <Stack direction="row" spacing={2} justifyContent="flex-start">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleCreateCatalog}
                    >
                        Guardar Cambios
                    </Button>
                    <Button
                        sx={{ color: "#9A9A9A", borderColor: "#9A9A9A" }}
                        variant="outlined"
                        onClick={handleCancelCatalog}
                    >
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </FormLayout>
    );
};

CreateCatalog.propTypes = {
    catalogName: PropTypes.string,
};


export default CreateCatalog;