import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import requestCreator from '../../libs/requestCreator';
import { SERVER_QUERY } from './constants';

export default () => {
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState(undefined);
  const [error, setError] = useState('');
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

  return {
    loading,
    server,
    error,
  };
};
