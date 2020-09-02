import React from 'react';

import { FormControlLabel, Checkbox } from '@material-ui/core';

function MyCheckbox({ checked, label, onChange, ...rest }) {
  return (
    <FormControlLabel
      control={<Checkbox checked={checked} onChange={onChange} {...rest} />}
      label={label}
    />
  );
}

export default MyCheckbox;
