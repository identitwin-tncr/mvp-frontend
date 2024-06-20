import React from "react";
import { MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";

const SelectInput = ({ required, label, value, onChangeHandler, items }) => {
    return (
        <TextField
            select
            required={required}
            label={label}
            value={value}
            onChange={(e) => onChangeHandler(e.target.value)}
            sx={{ flex: 1 }}
        >
            {items.map((item) => {
                return (
                    <MenuItem key={item.id} value={item.id}>
                        {item.value}
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

SelectInput.propTypes = {
    required: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.number,
    onChangeHandler: PropTypes.func,
    items: PropTypes.arrayOf({ id: PropTypes.number.isRequired, value: PropTypes.string.isRequired }),
};

export default SelectInput;
