import React, { useState } from 'react';
import styled from 'styled-components';
import { useFetchCollection } from 'hooks/useFetchCollection';
import Table from 'components/tables/Table';
import Cell from 'components/tables/Cell';
import Pagination from 'components/tables/Pagination';
import functions from '../data/functions.json';
import segments from '../data/segments.json';
import FilterBox from 'components/tables/FilterBox';

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: 200px auto;
  grid-gap: 20px;
  max-width: 800px;
`;

const columns = [
  {
    name: 'ID',
    selector: 'id',
    minWidth: '80px',
    cell: (row) => <Cell name="ID">{row.id}</Cell>,
  },
  {
    name: 'Title',
    selector: 'title',
    minWidth: '150px',
    cell: (row) => <Cell name="Title">{row.title}</Cell>,
  },
  {
    name: 'Functions',
    selector: 'row.functions',
    minWidth: '135px',
    cell: (row) => (
      <Cell name="Job Functions" value={row.functions?.join(', ')} />
    ),
  },
  {
    name: 'Segments',
    selector: 'row.segments',
    minWidth: '135px',
    cell: (row) => (
      <Cell name="Job Segments" value={row.segments?.join(', ')} />
    ),
  },
];
const FILTERS = ['segments', 'functions'];

const Home = () => {
  const [newfilterInput, setNewFilterInput] = useState(null);
  const { data, params } = useFetchCollection('', newfilterInput);

  const handleFilter = ({ key, value }) => {
    setNewFilterInput({ key, value });
  };

  return (
    <Main>
      <Content>
        <div>
          <FilterBox
            label="Select a Function"
            id="functions"
            selectedOptions={params?.functions}
            options={functions}
            handleFilter={handleFilter}
          />
          <FilterBox
            label="Select a Segment"
            id="segments"
            selectedOptions={params?.segments}
            options={segments}
            handleFilter={handleFilter}
          />
        </div>

        <div>
          <Table
            columns={columns}
            data={data?.items}
            total={data?.total}
            progressPending={null}
          />
          <Pagination
            currentPage={null}
            limit={null}
            total={data?.total}
            onChangePage={null}
          />
        </div>
      </Content>
    </Main>
  );
};

export default Home;
