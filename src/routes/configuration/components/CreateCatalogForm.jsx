import {Stack, TextField} from "@mui/material";
import {onChangeValueHandler} from "../../../utils/formUtil";
import PropTypes from "prop-types";

const CreateCatalogForm = ({state, setState}) => {
	
	return (
        <div>
            {state && (
                <Stack gap={4}>
                    <TextField
                        required
                        value={state.value}
                        onChange={(e) => onChangeValueHandler(state, setState, "value", e.target.value)}
                        type="text"
                        label="Nombre"
                    />
                    <TextField
                        required
                        value={state.code}
                        onChange={(e) => onChangeValueHandler(state, setState, "code", e.target.value)}
                        type="text"
                        label="Código"
                    />
                </Stack>
            )}
        </div>
    );
}

CreateCatalogForm.propTypes = {
    state: PropTypes.object,
    setState: PropTypes.func,
};

export default CreateCatalogForm;
