import React from 'react';
import { Link } from 'react-router-dom';
import { Link as MaterialUILink } from '@material-ui/core';

function LinkToIndexPage({ children }) {
  return (
    <MaterialUILink component={Link} to="/" color="secondary" underline="hover">
      {children}
    </MaterialUILink>
  );
}

export default LinkToIndexPage;
