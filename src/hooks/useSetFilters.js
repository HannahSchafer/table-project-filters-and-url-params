import { useEffect, useState } from 'react';
const FILTERS = ['segments', 'functions'];

export const useSetFilters = (
  newfilterInput,
  setQueryParam,
  setParams,
  params,
  initialParams,
  search
) => {
  const [filteredDataItems, setFilteredDataItems] = useState([]);

  // APPLY QUERY PARAM FILTERS
  useEffect(() => {
    let selectedInitialFilters = {};
    FILTERS?.forEach((filterType) => {
      const urlFilters = search.get(`${filterType}`);
      if (urlFilters?.length > 0) {
        initialParams[`${filterType}`] = urlFilters
          ? urlFilters?.split(',')
          : [];
        selectedInitialFilters[filterType] = initialParams[`${filterType}`];
      }
    });
    setParams((params) => ({
      ...params,
      ...selectedInitialFilters,
    }));
  }, []);

  // APPLY CHOICES TO CHECKBOXES
  useEffect(() => {
    applyFilters(newfilterInput, params, setQueryParam, setParams);
  }, [newfilterInput]);

  // SET QUERY PARAM ON SELECTION CHANGE
  useEffect(() => {
    setQueryParam(newfilterInput);
  }, [params]);
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
