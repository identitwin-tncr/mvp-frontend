
const onChangeValueHandler = (state, setState, key, newValue) => {
	const newState = {
		...state
	};
	newState[key] = newValue
	setState(newState);
}

export {
	onChangeValueHandler
}