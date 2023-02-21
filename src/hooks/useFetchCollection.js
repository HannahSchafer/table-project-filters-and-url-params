import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getCollection } from '../data/api';

export const useFetchCollection = (tableIdentifier = '', registeredFilters) => {
  const location = useLocation();
  const history = useHistory();
  const search = new URLSearchParams(location.search);
  const initialParams = {
    [`page`]: Number.parseInt(search.get(`page`)) || 1,
    [`limit`]: Number.parseInt(search.get(`limit`)) || 10,
  };

  registeredFilters?.forEach((key) => {
    const urlFilters = search.get(`${key}`);

    initialParams[`${key}`] = urlFilters ? urlFilters?.split(',') : [];
  });

  const [params] = useState(initialParams);
  const [data, setData] = useState([]);
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

  const setQueryParam = (param) => {
    if (['page', 'limit'].includes(param.key.replace(tableIdentifier, ''))) {
      params[`${param.key}`] = param.value;
    }

    registeredFilters?.forEach((key) => {
      if (param.key === key) {
        const existingFilterIndex = params[`${key}`]?.indexOf(param.value);

        if (existingFilterIndex >= 0) {
          params[`${key}`].splice(existingFilterIndex, 1);
        } else {
          params[`${key}`].push(param.value);
        }
      }
    });

    const queryString = new URLSearchParams(params).toString();

    history.push(`${location.pathname}?${queryString}`);

    fetchData();
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
    setQueryParam,
    isLoading,
    data,
  };
};

export default useFetchCollection;
