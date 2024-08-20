import {Stack, TextField} from "@mui/material";
import {onChangeValueHandler} from "../../../utils/formUtil";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import SelectInput from "../../../components/input/SelectInput";

import { getMonitoringFrequenciesRequest, getBlocksRequest } from "../../../api/catalogRequests";

const CreateInstrumentForm = ({state, setState}) => {
	const [blocks, setBlocks] = useState([]);
	const [monitoringFrequencies, setMonitoringFrequencies] = useState([]);
	
    const fetchBlocks = async () => {
        getBlocksRequest().then((response) => {
            let blocksData = response.items.map(item => ({
                value: item.id,
                label: item.value
            }));
            setBlocks(blocksData);
        }).catch(err => console.log(err));
    }

    const fetchMonitoringFrequencies = async () => {
        getMonitoringFrequenciesRequest().then((response) => {
            let monitoringFrequenciesData = response.items.map(item => ({
                value: item.id,
                label: item.value
            }));
            setMonitoringFrequencies(monitoringFrequenciesData);
        }).catch(err => console.log(err));
    
    }

	useEffect(() => {
        fetchBlocks();
        fetchMonitoringFrequencies();
		
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
