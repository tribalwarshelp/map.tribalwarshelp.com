import React from 'react';

import { CircularProgress, Box } from '@material-ui/core';

function Spinner({ boxProps, ...spinnerProps }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...boxProps}
    >
      <CircularProgress {...spinnerProps} />
    </Box>
  );
}

Spinner.defaultProps = {
  boxProps: {},
};

export default Spinner;
