import React from 'react';

import { CircularProgress, Box } from '@material-ui/core';

function Spinner(props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress {...props} />
    </Box>
  );
}

export default Spinner;
