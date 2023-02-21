import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rem } from 'polished';
import screen from 'superior-mq';
import { bp } from 'styles/helpers';

const ColumnName = styled.div`
  font-weight: 600;
  padding: 20px 8px 20px 0;
  flex: 1 0 auto;

  ${screen.above(
    bp.portrait,
    `
    display: none;
  `
  )}

  ${screen.below(
    bp.mobileMid,
    `
    font-size: ${rem(12)};
  `
  )}
`;

const ColumnValue = styled.div`
  ${screen.below(
    bp.portrait,
    `
    text-align: right;
  `
  )}
`;

const Cell = ({ name, value, children, ...props }) => {
  return (
    <>
      <ColumnName>{name}</ColumnName>
      <ColumnValue {...props}>{children || value}</ColumnValue>
    </>
  );
};

Cell.ColumnName = ColumnName;

Cell.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

export default Cell;
