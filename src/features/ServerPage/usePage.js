import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';
import requestCreator from '../../libs/requestCreator';
import { URI } from '../../config/mapService';
import { SERVER_QUERY, TRIBES_QUERY, PLAYERS_QUERY } from './constants';

const isCheckboxEvent = (e) => e.target.type === 'checkbox';

export default () => {
  const [settings, setSettings] = useState({
    showBarbarian: false,
    largerMarkers: false,
    markersOnly: false,
    centerX: 500,
    centerY: 500,
    scale: 1,
    showGrid: true,
    showContinentNumbers: true,
    backgroundColor: '#000000',
  });
  const [tribeMarkers, setTribeMarkers] = useState([]);
  const [playerMarkers, setPlayerMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState(undefined);
  const [error, setError] = useState('');
  const [mapURL, setMapURL] = useState('');
  const { key } = useParams();

  useEffect(() => {
    requestCreator({
      query: SERVER_QUERY,
      variables: {
        filter: {
          key: [key],
          status: ['open'],
        },
      },
    })
      .then(({ servers }) => {
        if (
          servers &&
          Array.isArray(servers.items) &&
          servers.items.length > 0
        ) {
          setServer(servers.items[0]);
        } else {
          setError('Server not found');
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [key]);

  const handleSettingsChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: isCheckboxEvent(e) ? e.target.checked : e.target.value,
    });
  };

  const getNewMarker = () => ({
    id: uuidv4(),
    item: undefined,
    color: '#000000',
  });

  const updateMarker = ({ e, selectedItem, id, markers, setMarkers }) => {
    setMarkers(
      markers.map((marker) => {
        if (marker.id !== id) return marker;
        if (selectedItem || selectedItem === null) {
          return {
            ...marker,
            item: selectedItem,
          };
        }
        return {
          ...marker,
          [e.target.name]: isCheckboxEvent(e)
            ? e.target.checked
            : e.target.value,
        };
      })
    );
  };

  const handleAddTribeMarker = () => {
    setTribeMarkers([...tribeMarkers, getNewMarker()]);
  };

  const createDeleteTribeMarkerHandler = (id) => () => {
    setTribeMarkers(tribeMarkers.filter((marker) => marker.id !== id));
  };

  const createUpdateTribeMarkerHandler = (id) => (e, selectedItem) => {
    updateMarker({
      e,
      id,
      selectedItem,
      markers: tribeMarkers,
      setMarkers: setTribeMarkers,
    });
  };

  const handleAddPlayerMarker = () => {
    setPlayerMarkers([...playerMarkers, getNewMarker()]);
  };

  const createDeletePlayerMarkerHandler = (id) => () => {
    setPlayerMarkers(playerMarkers.filter((marker) => marker.id !== id));
  };

  const createUpdatePlayerMarkerHandler = (id) => (e, selectedItem) => {
    updateMarker({
      e,
      id,
      selectedItem,
      markers: playerMarkers,
      setMarkers: setPlayerMarkers,
    });
  };

  const buildVariablesForSearchQuery = (searchValue = '', tribe = false) => {
    const obj = {
      server: key,
      filter: {
        limit: 10,
        exists: true,
      },
    };

    if (tribe) {
      obj.filter.tagIEQ = searchValue + '%';
      obj.filter.sort = 'tag ASC';
    } else {
      obj.filter.nameIEQ = searchValue + '%';
      obj.filter.sort = 'name ASC';
    }

    return obj;
  };

  const searchPlayer = async (searchValue) => {
    try {
      const data = await requestCreator({
        query: PLAYERS_QUERY,
        variables: buildVariablesForSearchQuery(searchValue, false),
      });
      return data.players?.items ?? [];
    } catch (error) {
      return [];
    }
  };

  const searchTribe = async (searchValue) => {
    try {
      const data = await requestCreator({
        query: TRIBES_QUERY,
        variables: buildVariablesForSearchQuery(searchValue, true),
      });
      return data.tribes?.items ?? [];
    } catch (error) {
      return [];
    }
  };

  const encodeMarker = (marker) => {
    return encodeURIComponent(marker.item.id + ',' + marker.color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let searchParams = '';
    for (let key in settings) {
      searchParams += key + '=' + encodeURIComponent(settings[key]) + '&';
    }
    playerMarkers.forEach((marker) => {
      if (marker.item) {
        searchParams += 'player=' + encodeMarker(marker) + '&';
      }
    });
    tribeMarkers.forEach((marker) => {
      if (marker.item) {
        searchParams += 'tribe=' + encodeMarker(marker) + '&';
      }
    });

    setMapURL(URI + '/' + key + '?' + searchParams);
  };

  const debouncedHandleSettingsChange = useCallback(
    debounce(handleSettingsChange, 500),
    [settings]
  );

  return {
    loading,
    server,
    error,
    handleSettingsChange,
    settings,
    tribeMarkers,
    handleAddTribeMarker,
    createUpdateTribeMarkerHandler,
    createDeleteTribeMarkerHandler,
    playerMarkers,
    handleAddPlayerMarker,
    createUpdatePlayerMarkerHandler,
    createDeletePlayerMarkerHandler,
    debouncedHandleSettingsChange: (e) => {
      e.persist();
      debouncedHandleSettingsChange(e);
    },
    searchTribe,
    searchPlayer,
    handleSubmit,
    mapURL,
  };
};
