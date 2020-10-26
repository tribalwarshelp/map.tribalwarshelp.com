import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import { TextField, Box, IconButton } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Delete as DeleteIcon } from "@material-ui/icons";

function MarkerField({
  onDelete,
  onChange,
  loadSuggestions,
  getOptionLabel,
  getOptionSelected,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const debouncedOnChange = useCallback(debounce(onChange, 500), [onChange]);
  const debouncedLoadSuggestions = useCallback(
    debounce((searchValue) => {
      setLoading(true);
      loadSuggestions(searchValue)
        .then((data) => {
          setSuggestions(data);
        })
        .finally(() => setLoading(false));
    }, 500),
    []
  );

  useEffect(() => {
    debouncedLoadSuggestions(searchValue);
  }, [searchValue, debouncedLoadSuggestions]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-end">
      <Autocomplete
        options={suggestions}
        getOptionLabel={getOptionLabel}
        fullWidth
        autoSelect
        autoHighlight
        loading={loading}
        getOptionSelected={getOptionSelected}
        onChange={onChange}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <IconButton onClick={onDelete} size="small">
                    <DeleteIcon />
                  </IconButton>
                ),
              }}
              type="text"
              name="value"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          );
        }}
      />
      <TextField
        style={{ width: "40%" }}
        type="color"
        name="color"
        onChange={(e) => {
          e.persist();
          debouncedOnChange(e);
        }}
      />
    </Box>
  );
}

MarkerField.propTypes = {
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  loadSuggestions: PropTypes.func,
  getOptionLabel: PropTypes.func,
  getOptionSelected: PropTypes.func,
};

MarkerField.defaultProps = {
  loadSuggestions: () => {},
  getOptionLabel: (s) => s,
};

export default MarkerField;
