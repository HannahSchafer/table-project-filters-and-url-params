import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import screen from 'superior-mq';
import { bp } from 'styles/helpers';
import { rem } from 'polished';
import { SmallLoading } from 'components/Loading';
import { formatCommaNumbers } from 'util/formatText';

const customStyles = {
  headCells: {
    color: '#000000',
    activeSortStyle: {
      '&:focus': {
        color: '#0D6565',
      },
      '&:hover': {
        color: '#000000',
      },
    },
    inactiveSortStyle: {
      '&:focus': {
        color: '#0D6565',
      },
      '&:hover': {
        color: '#000000',
      },
    },
  },
};

const StyledTable = styled(DataTable).attrs((props) => ({
  sortServer: true,
  noHeader: props.noHeader === false ? false : true,
  subHeader: false,
  theme: 'BL',
  paginationServer: true,
  customStyles: customStyles,
  progressComponent: <SmallLoading />,
}))`
  color: var(--black);
  margin-bottom: 20px;
  font-size: ${rem(15)};

  .rdt_TableCol {
    font-size: inherit;
    font-weight: 600;
    padding-right: 12px;
    padding-left: 12px;
  }

  .rdt_TableHead {
    font-size: ${rem(14)};
  }

  .rdt_TableHeadRow {
    border-bottom: var(--border);
  }

  .rdt_TableRow {
    padding: ${(props) => (props.small ? '15px 0' : '24px 0')};
    border: 0;
    font-size: inherit;
    border-radius: var(--border-radius);

    &:nth-of-type(even) {
      background-color: var(--off-white);
    }
  }

  .rdt_TableCell {
    padding-right: 12px;
    padding-left: 12px;
    align-items: ${(props) => (props.cellAlign ? props.cellAlign : 'center')};
  }
`;

const ResultsHeader = styled.header`
  padding: 10px 0;
  font-size: ${rem(15)};
`;

const Table = ({ total = 0, ...props }) => {
  return (
    <>
      {total ? (
        <ResultsHeader>
          {formatCommaNumbers(total)}
          &nbsp;result{total > 1 ? 's' : null}
        </ResultsHeader>
      ) : null}
      <StyledTable {...props} />
    </>
  );
};

Table.propTypes = {
  // An array of columns to use for displaying the data.
  columns: PropTypes.array,
  // The total number of results in the data.
  total: PropTypes.number,
  // An array of data to display.
  data: PropTypes.array,
  // A boolean indicating if the table is loading.
  progressPending: PropTypes.bool,
};

Table.dashTableStyles = {
  fontSize: '.875rem',
  padding: '8px',
  marginBottom: 0,
};

Table.dashPaginationStyles = {
  fontSize: '1rem',
  paddingRight: '8px',
  marginBottom: 0,
};

export default Table;
