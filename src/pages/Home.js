import React from 'react';
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

const Home = () => {
  const { data } = useFetchCollection;

  return (
    <Main>
      <Content>
        <div>
          <FilterBox
            label="Select a Function"
            id="functions"
            selectedOptions={}
            options={functions}
            handleFilter={}
          />
          <FilterBox
            label="Select a Segment"
            id="segments"
            selectedOptions={}
            options={segments}
            handleFilter={}
          />
        </div>

        <div>
          <Table
            columns={columns}
            data={data?.items}
            total={data?.total}
            progressPending={}
          />
          <Pagination
            currentPage={}
            limit={}
            total={data?.total}
            onChangePage={}
          />
        </div>
      </Content>
    </Main>
  );
};

export default Home;
