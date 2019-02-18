import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((option, i) => (
    <MenuItem key={i} value={option}>
      {option}
    </MenuItem>
  ));
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={name}>{name}</InputLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        error={error && true}
        id={name}
      >
        {selectOptions}
      </Select>
      {error && (
        <FormHelperText id={name} error>
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
