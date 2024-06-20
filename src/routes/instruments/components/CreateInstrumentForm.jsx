import {Stack, TextField} from "@mui/material";
import {onChangeValueHandler} from "../../../utils/formUtil";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import blocksDummy from "../../../static/blocks.json";
import frequencyDummy from "../../../static/monitoringFrequency.json";
import SelectInput from "../../../components/input/SelectInput";

const CreateInstrumentForm = ({state, setState}) => {
	const [blocks, setBlocks] = useState([]);
	const [monitoringFrequencies, setMonitoringFrequencies] = useState([]);
	
	useEffect(() => {
		// TODO: ADD BLOCKS LIST RETRIEVAL FROM DB
		setBlocks(blocksDummy);
		// TODO: ADD MONITORING LIST RETRIEVAL FROM DB
		setMonitoringFrequencies(frequencyDummy);
	}, []);
	
	return (
        <div>
            {state && (
                <Stack gap={4}>
                    <TextField
                        required
                        value={state.value}
                        onChange={(e) => onChangeValueHandler(state, setState, "name", e.target.value)}
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
					<TextField
                        required
                        value={state.model}
                        onChange={(e) => onChangeValueHandler(state, setState, "model", e.target.value)}
                        type="text"
                        label="Modelo"
                    />
                    <TextField
                        required
                        value={state.assetCode}
                        onChange={(e) => onChangeValueHandler(state, setState, "assetCode", e.target.value)}
                        type="text"
                        label="Código de activo (Identificador TNCR)"
                    />
					<SelectInput
                        required={true}
                        value={state.block}
                        onChangeHandler={(e) => onChangeValueHandler(state, setState, "block", e)}
                        label="Bloque"
                        items={blocks}
                    />
					<SelectInput
                        required={true}
                        value={state.monitoringFrequency}
                        onChangeHandler={(e) => onChangeValueHandler(state, setState, "monitoringFrequency", e)}
                        label="Frecuencia de monitoreo"
                        items={monitoringFrequencies}
                    />
                </Stack>
            )}
        </div>
    );
}

CreateInstrumentForm.propTypes = {
    state: PropTypes.object,
    setState: PropTypes.func,
};

export default CreateInstrumentForm;
