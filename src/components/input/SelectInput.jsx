import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem, styled } from '@mui/material';

const StyledSelect = styled(Select)({
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
  '& .MuiSelect-icon': {
    color: '#000',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#000',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#000',
  },
});

const SelectInput = ({ label, items, selectedItem, onChange, fullWidth }) => {
  return (
    <FormControl fullWidth={fullWidth} variant="outlined">
      <InputLabel shrink={true}>{label}</InputLabel>
      <StyledSelect
        value={selectedItem}
        onChange={(event) => onChange(event.target.value)}
        label={label}
        displayEmpty
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
};

SelectInput.defaultProps = {
  fullWidth: true,
};

export default SelectInput;
