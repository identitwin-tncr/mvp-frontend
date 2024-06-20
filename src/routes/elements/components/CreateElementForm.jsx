import {Stack, TextField} from "@mui/material";
import {onChangeValueHandler} from "../../../utils/formUtil";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import blocksDummy from '../../../static/blocks.json';
import elementTypesDummy from '../../../static/elementTypes.json';
import orientationsDummy from '../../../static/orientation.json';
import cardinalPointsDummy from '../../../static/cardinalPoints.json';
import SelectInput from "../../../components/input/SelectInput";

const CreateElementForm = ({state, setState}) => {
	const [blocks, setBlocks] = useState([]);
	const [elementTypes, setElementTypes] = useState([]);
	const [orientations, setOrientations] = useState([]);
	const [cardinalPoints, setCardinalPoints] = useState([]);
	
	useEffect(() => {
		// TODO: ADD BLOCKS LIST RETRIEVAL FROM DB
		setBlocks(blocksDummy);
		// TODO: ADD ELEMENT TYPES LIST RETRIEVAL FROM BD
		setElementTypes(elementTypesDummy)
		// TODO: ADD ORIENTATIONS LIST RETRIEVAL FROM BD
		setOrientations(orientationsDummy)
		// TODO: ADD CARDINAL POINTS LIST RETRIEVAL FROM BD
		setCardinalPoints(cardinalPointsDummy)
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
                        label="Tipo de elemento"
                        items={elementTypes}
                    />
					<SelectInput
                        required={false}
                        value={state.orientation}
                        onChangeHandler={(e) => onChangeValueHandler(state, setState, "elementType", e)}
                        label="Orientación"
                        items={orientations}
                    />
                    <TextField
                        required={false}
                        value={state.number}
                        onChange={(e) => onChangeValueHandler(state, setState, "number", e.target.value)}
                        type="number"
                        label="Número"
                    />
					<SelectInput
                        required={false}
                        value={state.cardinalPoint}
                        onChangeHandler={(e) => onChangeValueHandler(state, setState, "cardinalPoint", e)}
                        label="Punto Cardinal"
                        items={cardinalPoints}
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
