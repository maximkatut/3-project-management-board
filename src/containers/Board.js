import React from "react";
import styled from "styled-components";
import Lane from "../components/Lane/Lane";
import withDataFetching from "../hocs/withDataFetching";

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Board = ({ data, loading, error, lanes }) => {
  return (
    <BoardWrapper>
      {lanes.map((lane) => (
        <Lane
          key={lane.id}
          title={lane.title}
          loading={loading}
          tickets={data.filter((ticket) => ticket.lane === lane.id)}
          error={error}
        />
      ))}
    </BoardWrapper>
  );
};

export default withDataFetching(Board);
