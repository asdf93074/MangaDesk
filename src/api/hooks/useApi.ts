import { useState } from 'react';

export function useApi(endpoint: () => {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const request = async (callback: () => {}) => {
    setIsLoading(true);
    try {
      const result = await endpoint();
      callback();
      setData(result);
    } catch (err) {
      setError(err.message || 'Unexpected Error!');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    request,
  };
}
