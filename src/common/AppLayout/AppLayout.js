import React from 'react';

import { Typography, CssBaseline } from '@material-ui/core';

function AppLayout({ children }) {
  return (
    <div>
      <header>
        <Typography variant="subtitle2">tribalwarshelp.com</Typography>
        <Typography variant="h1">TWHelp</Typography>
      </header>
      <main>{children}</main>
      <footer>
        <Typography variant="body2">
          © {new Date().getFullYear()} Dawid Wysokiński
        </Typography>
      </footer>
      <CssBaseline />
    </div>
  );
}

export default AppLayout;
