import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getCollection } from '../data/api';
import { useSetFilters } from './useSetFilters';

export const useFetchCollection = (tableIdentifier = '', newfilterInput) => {
  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search);
  const initialParams = {
    [`page`]: Number.parseInt(search.get(`page`)) || 1,
    [`limit`]: Number.parseInt(search.get(`limit`)) || 10,
  };

  const setQueryParam = (newfilterInput) => {
    if (!newfilterInput) {
      return;
    }
    const queryString = new URLSearchParams(params).toString();
    history.push(`${location.pathname}?${queryString}`);
    fetchData();
  };


  const [data, setData] = useState([]);

  const { params } = useSetFilters(
    newfilterInput,
    setQueryParam,
    initialParams,
    search
  );

  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);

    getCollection(params || initialParams, tableIdentifier)
      .then((filteredData) => {
        setData(filteredData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoading) return;

    fetchData();
  }, [location, params]);

  return {
    page: params?.[`_page`],
    limit: params?.[`limit`],
    params: Object.keys(params).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [key.replace(`${tableIdentifier}_`, '')]: params[key] },
      }),
      {}
    ),
    isLoading,
    data,
    params,
  };
};

export default useFetchCollection;
