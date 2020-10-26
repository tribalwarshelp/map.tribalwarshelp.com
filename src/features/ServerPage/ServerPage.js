import React from 'react';
import { isObject } from 'lodash';
import { formatDistanceToNow } from 'date-fns';
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
import MarkerField from './components/MarkerField';
import Map from './components/Map';

const useStyles = makeStyles((theme) => ({
  formGroup: {
    '& > *': {
      marginBottom: theme.spacing(1),
    },
  },
}));

function ServerPage() {
  const classes = useStyles();
  const {
    loading,
    server,
    error,
    handleSettingsChange,
    settings,
    debouncedHandleSettingsChange,
    handleAddPlayerMarker,
    handleAddTribeMarker,
    createDeletePlayerMarkerHandler,
    createDeleteTribeMarkerHandler,
    createUpdatePlayerMarkerHandler,
    createUpdateTribeMarkerHandler,
    playerMarkers,
    searchTribe,
    searchPlayer,
    tribeMarkers,
    handleSubmit,
    mapURL,
  } = usePage();

  const tribeGetOptionLabel = (tribe) => (isObject(tribe) ? tribe.tag : '');
  const tribeGetOptionSelected = (option, value) =>
    isObject(option) && isObject(value) ? option.tag === value.tag : false;
  const playerGetOptionLabel = (player) =>
    isObject(player) ? player.name : '';
  const playerGetOptionSelected = (option, value) =>
    isObject(option) && isObject(value) ? option.name === value.name : false;

  return (
    <AppLayout>
      {loading && <Spinner color="secondary" size="150px" />}
      {!loading && error && (
        <Typography variant="h2" align="center">
          <LinkToIndexPage>{error}</LinkToIndexPage>
        </Typography>
      )}
      {!loading && server && (
        <Container>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} lg={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  gutterBottom
                  align="center"
                >
                  {server.key}
                </Typography>
                <Typography>
                  The server data was updated{' '}
                  {formatDistanceToNow(new Date(server.dataUpdatedAt))} ago.
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
              <Grid item xs={12} sm={6} lg={3}>
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
                    name="scale"
                    value={settings.scale}
                    onChange={handleSettingsChange}
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
                    name="centerX"
                    value={settings.centerX}
                    onChange={handleSettingsChange}
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
                    name="centerY"
                    value={settings.centerY}
                    onChange={handleSettingsChange}
                    fullWidth
                    inputProps={{
                      min: 0,
                      max: server.config.coord.mapSize,
                      step: '.01',
                    }}
                  />
                  <TextField
                    label="Background color"
                    name="backgroundColor"
                    onChange={debouncedHandleSettingsChange}
                    fullWidth
                    type="color"
                  />
                  <TextField
                    label="Grid line color"
                    name="gridLineColor"
                    onChange={debouncedHandleSettingsChange}
                    defaultValue={settings.gridLineColor}
                    fullWidth
                    type="color"
                  />
                  <TextField
                    label="Continent number color"
                    name="continentNumberColor"
                    onChange={debouncedHandleSettingsChange}
                    defaultValue={settings.continentNumberColor}
                    fullWidth
                    type="color"
                  />
                  <Checkbox
                    name="markersOnly"
                    checked={settings.markersOnly}
                    onChange={handleSettingsChange}
                    label="Markers only"
                  />
                  <Checkbox
                    label="Show barbarian villages"
                    name="showBarbarian"
                    checked={settings.showBarbarian}
                    onChange={handleSettingsChange}
                  />
                  <Checkbox
                    label="Larger markers"
                    name="largerMarkers"
                    checked={settings.largerMarkers}
                    onChange={handleSettingsChange}
                  />
                  <Checkbox
                    label="Continent grid"
                    name="showGrid"
                    checked={settings.showGrid}
                    onChange={handleSettingsChange}
                  />
                  <Checkbox
                    label="Continent numbers"
                    name="showContinentNumbers"
                    checked={settings.showContinentNumbers}
                    onChange={handleSettingsChange}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  Tribe markers
                </Typography>
                <div className={classes.formGroup}>
                  {tribeMarkers.map((marker) => {
                    return (
                      <MarkerField
                        key={marker.id}
                        onDelete={createDeleteTribeMarkerHandler(marker.id)}
                        onChange={createUpdateTribeMarkerHandler(marker.id)}
                        loadSuggestions={searchTribe}
                        getOptionLabel={tribeGetOptionLabel}
                        getOptionSelected={tribeGetOptionSelected}
                      />
                    );
                  })}
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={handleAddTribeMarker}
                    disabled={tribeMarkers.length >= 100}
                  >
                    Add marker
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Typography
                  variant="h4"
                  component="h3"
                  align="center"
                  gutterBottom
                >
                  Player markers
                </Typography>
                <div className={classes.formGroup}>
                  {playerMarkers.map((marker) => {
                    return (
                      <MarkerField
                        key={marker.id}
                        onDelete={createDeletePlayerMarkerHandler(marker.id)}
                        onChange={createUpdatePlayerMarkerHandler(marker.id)}
                        loadSuggestions={searchPlayer}
                        getOptionLabel={playerGetOptionLabel}
                        getOptionSelected={playerGetOptionSelected}
                      />
                    );
                  })}
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    onClick={handleAddPlayerMarker}
                    disabled={playerMarkers.length >= 100}
                  >
                    Add marker
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" component="div">
                  <Button
                    type="submit"
                    size="large"
                    color="secondary"
                    variant="contained"
                  >
                    Generate new map
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </form>
          {mapURL && (
            <Map
              src={mapURL}
              alt={server.key}
              maxWidth={server.config.coord.mapSize}
            />
          )}
        </Container>
      )}
    </AppLayout>
  );
}

export default ServerPage;
