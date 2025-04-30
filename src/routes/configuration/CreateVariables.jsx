import { useNavigate } from "react-router-dom";
import FormLayout from "../../components/layout/FormLayout";
import { 
    Button, 
    Stack, 
    Typography, 
    Box, 
    IconButton, 
    TextField, 
    Snackbar, 
    Alert,
 } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React, { useState } from "react";

const CreateVariables = () => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [formData, setFormData] = useState({
        variable: "",
        unidad: "",
    });

    const [errors, setErrors] = useState({
        variable: false,
        unidad: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: false });
    };

    const validateForm = () => {
        const newErrors = {
            variable: !formData.variable.trim(),
            unidad: !formData.unidad.trim(),
        };
        setErrors(newErrors);
        return !newErrors.variable && !newErrors.unidad;
    };

    // TODO: Agregar logica de backend
    const handleCreate = () => {
        if (validateForm()) {
            console.log("Variable creada:", formData);
            setSnackbarOpen(true);
        }
    };

    const handleCancelar = () => {
        navigate(-1);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        navigate(-1);
    };

    return (
        <FormLayout layoutWidth={"100%"}>
            <Box sx={{ width: "100%" }}>
                <Box display="flex" alignItems="center" mb={4}>
                    <IconButton
                        onClick={handleCancelar}
                        sx={{
                            marginRight: 2,
                            color: "#143846",
                        }}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h4" fontWeight="bold">
                        Agregar Variable
                    </Typography>
                </Box>
                <Stack gap={4}>
                    <TextField
                        label="Variable de Monitoreo"
                        name="variable"
                        value={formData.variable}
                        onChange={handleChange}
                        error={errors.variable}
                        helperText={errors.variable && "La variable es obligatoria."}
                        fullWidth
                    />
                    <TextField
                        label="Unidad de Medición"
                        name="unidad"
                        value={formData.unidad}
                        onChange={handleChange}
                        error={errors.unidad}
                        helperText={errors.unidad && "La unidad de medición es obligatoria."}
                        fullWidth
                    />
                    <Box display="flex" gap={2}>
                        <Button variant="contained" color="primary" onClick={handleCreate}>
                            Crear Variable
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancelar}>
                            Cancelar
                        </Button>
                    </Box>
                </Stack>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleSnackbarClose}
                        severity="success"
                        sx={{ width: "100%" }}
                    >
                        ¡La variable ha sido creada exitosamente!
                    </Alert>
                </Snackbar>
            </Box>
        </FormLayout>
    );
};

export default CreateVariables;