import { useEffect, useState } from 'react';
import requestCreator from '../../libs/requestCreator';
import { VERSIONS_QUERY, SERVERS_QUERY } from './constants';

export default () => {
  const [versions, setVersions] = useState([]);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLangVersion, setSelectedLangVersion] = useState('');
  const [selectedServer, setSelectedServer] = useState('');

  useEffect(() => {
    requestCreator({
      query: VERSIONS_QUERY,
    })
      .then(({ versions }) => {
        if (versions && Array.isArray(versions.items)) {
          setVersions(versions.items);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleLangVersionChange = async (e) => {
    const { value } = e.target;
    setSelectedServer('');
    setSelectedLangVersion(value);

    if (!value) {
      return;
    }

    setLoading(true);
    try {
      const { servers } = await requestCreator({
        query: SERVERS_QUERY,
        variables: {
          filter: {
            status: ['open'],
            sort: 'key ASC',
            langVersionTag: [value],
          },
        },
      });
      if (servers && Array.isArray(servers.items)) {
        setServers(servers.items);
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleServerChange = (e) => {
    setSelectedServer(e.target.value);
  };

  return {
    versions,
    servers,
    error,
    loading,
    selectedLangVersion,
    selectedServer,
    handleLangVersionChange,
    handleServerChange,
  };
};
