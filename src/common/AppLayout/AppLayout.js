import React from 'react';

import { Typography, CssBaseline, Box, Link } from '@material-ui/core';

function AppLayout({ children }) {
  return (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box marginY={3} component="header" textAlign="center">
        <Typography variant="subtitle2">
          <Link color="secondary" href="https://tribalwarshelp.com/">
            tribalwarshelp.com
          </Link>
        </Typography>
        <Typography variant="h1">TWHelp</Typography>
      </Box>
      <main>{children}</main>
      <Box marginY={3} component="footer" textAlign="center">
        <Typography>© {new Date().getFullYear()} Dawid Wysokiński</Typography>
      </Box>
      <CssBaseline />
    </Box>
  );
}

export default AppLayout;
