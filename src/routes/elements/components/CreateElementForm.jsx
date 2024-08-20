import {Stack, TextField} from "@mui/material";
import {onChangeValueHandler} from "../../../utils/formUtil";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import SelectInput from "../../../components/input/SelectInput";
import { getBlocksRequest, getElementTypesRequest, getCardinalPointsRequest,getOrientationsRequest } from "../../../api/catalogRequests";

const CreateElementForm = ({state, setState}) => {
	const [blocks, setBlocks] = useState([]);
	const [elementTypes, setElementTypes] = useState([]);
	const [orientations, setOrientations] = useState([]);
	const [cardinalPoints, setCardinalPoints] = useState([]);

    const fetchBlocks = async () => {
        getBlocksRequest().then((response) => {
            let blocksData = response.items.map(item => ({
                value: item.id,
                label: item.value
            }));
            setBlocks(blocksData);
        }).catch(err => console.log(err));
    }

    const fetchElementTypes = async () => {
        getElementTypesRequest().then((response) => {
            let elementTypesData = response.items.map(item => ({
                value: item.id,
                label: item.value
            }));
            setElementTypes(elementTypesData);
        }).catch(err => console.log(err));
    }

    const fetchOrientations = async () => {
        getOrientationsRequest().then((response) => {
            let orientationsData = response.items.map(item => ({
                value: item.id,
                label: item.value
            }));
            setOrientations(orientationsData);
        }).catch(err => console.log(err));
    }

    const fetchCardinalPoints = async () => {
        getCardinalPointsRequest().then((response) => {
            let cardinalPointsData = response.items.map(item => ({
                value: item.id,
                label: item.value
            }));
            setCardinalPoints(cardinalPointsData);
        }).catch(err => console.log(err));
    }
    
	
	useEffect(() => {
        fetchBlocks();
        fetchElementTypes();
        fetchOrientations();
        fetchCardinalPoints();

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
                        onChange={(e) => onChangeValueHandler(state, setState, "block", e)}
                        label="Bloque"
                        items={blocks}
                    />
					<SelectInput
                        required={true}
                        value={state.elementType}
                        onChange={(e) => onChangeValueHandler(state, setState, "elementType", e)}
                        label="Tipo de elemento"
                        items={elementTypes}
                    />
					<SelectInput
                        required={false}
                        value={state.orientation}
                        onChange={(e) => onChangeValueHandler(state, setState, "elementType", e)}
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
                        onChange={(e) => onChangeValueHandler(state, setState, "cardinalPoint", e)}
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
