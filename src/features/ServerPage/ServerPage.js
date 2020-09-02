import React from 'react';
import usePage from './usePage';

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Container,
  Button,
  Grid,
  TextField,
} from '@material-ui/core';
import AppLayout from '../../common/AppLayout/AppLayout';
import LinkToIndexPage from './components/LinkToIndexPage';
import Checkbox from './components/Checkbox';
import Spinner from './components/Spinner';

const useStyles = makeStyles((theme) => ({
  formGroup: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

function ServerPage() {
  const classes = useStyles();
  const { loading, server, error } = usePage();

  return (
    <AppLayout>
      {loading && <Spinner color="secondary" size={'150px'} />}
      {!loading && error && (
        <Typography variant="h2">
          <LinkToIndexPage>{error}</LinkToIndexPage>
        </Typography>
      )}
      {!loading && server && (
        <Container>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  align="center"
                >
                  {server.key}
                </Typography>
                <Typography>
                  Data last updated at{' '}
                  {new Date(server.dataUpdatedAt).toLocaleDateString(
                    server.langVersion.tag,
                    {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    }
                  )}
                </Typography>
                <Typography>
                  Number of players:{' '}
                  <strong>{server.numberOfPlayers.toLocaleString()}</strong>
                </Typography>
                <Typography>
                  Number of tribes:{' '}
                  <strong>{server.numberOfTribes.toLocaleString()}</strong>
                </Typography>
                <Typography>
                  Number of villages:{' '}
                  <strong>{server.numberOfVillages.toLocaleString()}</strong>
                </Typography>
                <Typography gutterBottom>
                  <LinkToIndexPage>Go back to server selection</LinkToIndexPage>
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  Settings
                </Typography>
                <div className={classes.formGroup}>
                  <TextField
                    label="Zoom level"
                    type="number"
                    defaultValue="1"
                    fullWidth
                    inputProps={{
                      min: 1,
                      max: 5,
                      step: '.01',
                    }}
                  />
                  <TextField
                    label="Center X"
                    type="number"
                    defaultValue="500"
                    fullWidth
                    inputProps={{
                      min: 0,
                      max: server.config.coord.mapSize,
                      step: '.01',
                    }}
                  />
                  <TextField
                    label="Center Y"
                    type="number"
                    defaultValue="500"
                    fullWidth
                    inputProps={{
                      min: 0,
                      max: server.config.coord.mapSize,
                      step: '.01',
                    }}
                  />
                  <TextField
                    label="Background color"
                    defaultValue="#000"
                    fullWidth
                    type="color"
                  />
                  <Checkbox label="Markers only" />
                  <Checkbox label="Show barbarians" />
                  <Checkbox label="Larger markers" />
                  <Checkbox label="Continent grid" />
                  <Checkbox label="Continent numbers" />
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  Tribe markers
                </Typography>
                <div className={classes.formGroup}>
                  <Button variant="contained" fullWidth>
                    Add marker
                  </Button>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  Player markers
                </Typography>
                <div className={classes.formGroup}>
                  <Button variant="contained" fullWidth>
                    Add marker
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" component="div">
                  <Button size="large" color="secondary" variant="contained">
                    Generate new map
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </AppLayout>
  );
}

export default ServerPage;
