import { Stack, TextField, Typography } from "@mui/material";
import { onChangeValueHandler } from "../../../utils/formUtil";
import PropTypes from "prop-types";

const CreateCatalogForm = ({ state, setState }) => {

    // TODO: Agregar funcionalidad
    
    const handleVariableChange = (index, field, value) => {
        const updatedVariables = [...state.variables];
        updatedVariables[index][field] = value;
        setState({ ...state, variables: updatedVariables });
    };

    return (
        <div>
            {state && (
                <Stack gap={4}>
                    {/* Campos para Material y Código */}
                    <TextField
                        required
                        value={state.material}
                        onChange={(e) =>
                            onChangeValueHandler(state, setState, "material", e.target.value)
                        }
                        type="text"
                        label="Material"
                    />
                    <TextField
                        required
                        value={state.codigo}
                        onChange={(e) =>
                            onChangeValueHandler(state, setState, "codigo", e.target.value)
                        }
                        type="text"
                        label="Código"
                    />

                    {/* Variables de Monitoreo */}
                    <Typography variant="h6" fontWeight="bold">
                        Variables de Monitoreo
                    </Typography>
                    {state.variables &&
                        state.variables.map((variable, index) => (
                            <Stack key={index} direction="row" gap={2} alignItems="center">
                                <Typography sx={{ width: "30%" }}>{variable.nombre}</Typography>
                                <TextField
                                    label="Rango Mínimo"
                                    type="number"
                                    value={variable.rangoMinimo}
                                    onChange={(e) =>
                                        handleVariableChange(
                                            index,
                                            "rangoMinimo",
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                                <TextField
                                    label="Rango Máximo"
                                    type="number"
                                    value={variable.rangoMaximo}
                                    onChange={(e) =>
                                        handleVariableChange(
                                            index,
                                            "rangoMaximo",
                                            parseInt(e.target.value)
                                        )
                                    }
                                />
                            </Stack>
                        ))}
                </Stack>
            )}
        </div>
    );
};

CreateCatalogForm.propTypes = {
    state: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
};

export default CreateCatalogForm;
