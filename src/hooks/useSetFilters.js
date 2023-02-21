import { useEffect, useState } from 'react';
const FILTERS = ['segments', 'functions'];

export const useSetFilters = (
  newfilterInput,
  setQueryParam,
  initialParams,
  search
) => {
  const [params, setParams] = useState(initialParams);

  // APPLY QUERY PARAM FILTERS ON LOAD
  useEffect(() => {
    FILTERS?.forEach((filterType) => {
      const urlFilters = search.get(`${filterType}`);
      if (urlFilters?.length > 0) {
        initialParams[`${filterType}`] = urlFilters
          ? urlFilters?.split(',')
          : [];
      }
    });
  }, []);

  // APPLY CHOICES TO CHECKBOXES
  useEffect(() => {
    applyFilters(newfilterInput, params, setQueryParam, setParams);
  }, [newfilterInput]);

  // SET QUERY PARAM ON SELECTION CHANGE
  useEffect(() => {
    setQueryParam(newfilterInput);
  }, [params]);

  return {
    params,
    initialParams,
  };
};

const applyFilters = (newfilterInput, params, setQueryParam, setParams) => {
  if (!newfilterInput) {
    return;
  }

  const { key, value } = newfilterInput;
  let paramsCopy = { ...params };
  if (key in paramsCopy && paramsCopy[key].includes(value)) {
    const updatedCategoryFilters = paramsCopy[key].filter(
      (val) => val !== value
    );
    paramsCopy[key] = updatedCategoryFilters;
    if (paramsCopy[key].length === 0) {
      delete paramsCopy[key];
    }
    setParams((params) => ({
      ...paramsCopy,
    }));
  } else {
    if (key in paramsCopy) {
      paramsCopy[key].push(value);
    } else {
      paramsCopy[key] = [value];
    }
    setParams((params) => ({
      ...paramsCopy,
    }));
  }
};
