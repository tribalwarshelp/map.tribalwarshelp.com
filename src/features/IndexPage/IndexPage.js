import React from 'react';
import usePage from './usePage';

import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  Button,
  Link as MaterialUILink,
} from '@material-ui/core';
import AppLayout from '../../common/AppLayout/AppLayout';

const useStyles = makeStyles((theme) => ({
  form: {
    minWidth: 300,
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}));

function IndexPage() {
  const classes = useStyles();
  const {
    loading,
    langVersions,
    servers,
    error,
    selectedLangVersion,
    selectedServer,
    handleLangVersionChange,
    handleServerChange,
  } = usePage();

  const defaultTextFieldProps = {
    fullWidth: true,
    select: true,
  };
  const isButtonDisabled = loading || !selectedLangVersion || !selectedServer;

  return (
    <AppLayout>
      {error && <Alert severity="error">{error}</Alert>}
      <div className={classes.form}>
        <TextField
          label="Select version"
          value={selectedLangVersion}
          disabled={loading}
          onChange={handleLangVersionChange}
          {...defaultTextFieldProps}
        >
          <MenuItem value="">Select</MenuItem>
          {langVersions.map((langVersion) => (
            <MenuItem key={langVersion.tag} value={langVersion.tag}>
              {langVersion.host}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Select server"
          value={selectedServer}
          disabled={loading || selectedLangVersion === ''}
          onChange={handleServerChange}
          {...defaultTextFieldProps}
        >
          <MenuItem value="">Select</MenuItem>
          {servers.map((server) => (
            <MenuItem key={server.key} value={server.key}>
              {server.key}
            </MenuItem>
          ))}
        </TextField>
        <MaterialUILink
          component={Link}
          underline="none"
          to={`/${selectedServer}`}
          onClick={isButtonDisabled ? (e) => e.preventDefault() : undefined}
        >
          <Button
            disabled={isButtonDisabled}
            fullWidth
            size="large"
            color="secondary"
            variant="contained"
          >
            Continue
          </Button>
        </MaterialUILink>
      </div>
    </AppLayout>
  );
}

export default IndexPage;
