import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CheckInput from 'components/forms/CheckInput';

const StyledWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  grid-row-gap: 5px;
  max-height: 300px;
  overflow-y: scroll;
  margin-bottom: 30px;
  background-color: var(--border-light);
  border-radius: var(--border-radius);
`;

const FilterTitle = styled.h3``;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;

  * {
    flex: 0 0 100%;
  }
`;

const FilterBox = ({
  label,
  id,
  handleFilter,
  options = [],
  selectedOptions = [],
}) => {
  return (
    <StyledWrap>
      <FilterTitle>{label}</FilterTitle>
      <Filters>
        {options?.map((option, index) => (
          <CheckInput
            id={`${id}-${index}`}
            key={`filter-${index}`}
            onChange={() => {
              if (handleFilter) {
                handleFilter({ key: id, value: option });
              }
            }}
            checked={selectedOptions.includes(option)}
            label={option}
          />
        ))}
      </Filters>
    </StyledWrap>
  );
};

FilterBox.propTypes = {
  // The name to display for this filter box.
  label: PropTypes.string.isRequired,
  // A unique id for this filter box.
  id: PropTypes.string.isRequired,
  // A function that handles storing the state of this filter.
  handleFilter: PropTypes.func,
  // A string array of options (ex: ["Software Engineering", "Customer Success"]).
  options: PropTypes.arrayOf(PropTypes.string),
  // A string array of actively selected options.
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
};

export default FilterBox;
