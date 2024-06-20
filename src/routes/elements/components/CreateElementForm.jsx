import {Stack, TextField} from "@mui/material";
import {onChangeValueHandler} from "../../../utils/formUtil";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import blocksDummy from '../../../static/blocks.json'
import SelectInput from "../../../components/input/SelectInput";

const CreateElementForm = ({state, setState}) => {
	const [blocks, setBlocks] = useState([]);
	const [elementTypes, setElementTypes] = useState([]);
	
	useEffect(() => {
		// TODO: ADD BLOCKS LIST RETRIEVAL FROM DB
		setBlocks(blocksDummy);
		// TODO: ADD ELEMENT TYPES LIST RETRIEVAL FROM BD
		setElementTypes(elementTypes)
	}, []);
	
	return (
        <div>
            {state && (
                <Stack gap={4}>
                    <TextField
                        required
                        value={state.code}
                        onChange={(e) => onChangeValueHandler(state, setState, "code", e.target.value)}
                        type="text"
                        label="Código"
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
                        value={state.elementType}
                        onChangeHandler={(e) => onChangeValueHandler(state, setState, "elementType", e)}
                        label="Bloque"
                        items={elementTypes}
                    />
                </Stack>
            )}
        </div>
    );
}

CreateElementForm.propTypes = {
    state: PropTypes.object,
    setState: PropTypes.func,
};

export default CreateElementForm;
