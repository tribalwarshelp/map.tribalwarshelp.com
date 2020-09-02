import { useEffect, useState } from 'react';
import requestCreator from '../../libs/requestCreator';
import { LANG_VERSIONS_QUERY, SERVERS_QUERY } from './constants';

export default () => {
  const [langVersions, setLangVersions] = useState([]);
  const [servers, setServers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedLangVersion, setSelectedLangVersion] = useState('');
  const [selectedServer, setSelectedServer] = useState('');

  useEffect(() => {
    requestCreator({
      query: LANG_VERSIONS_QUERY,
    })
      .then(({ langVersions }) => {
        if (langVersions && Array.isArray(langVersions.items)) {
          setLangVersions(langVersions.items);
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
    langVersions,
    servers,
    error,
    loading,
    selectedLangVersion,
    selectedServer,
    handleLangVersionChange,
    handleServerChange,
  };
};
