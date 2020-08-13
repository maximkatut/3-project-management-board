import React, { Component } from "react";
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

class Board extends Component {
  constructor() {
    super();
    this.state = {
      tickets: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ tickets: this.props.data });
    }
  }

  onDragStart = (evt, id) => {
    evt.dataTransfer.setData("id", id);
  };

  onDragOver = (evt) => {
    evt.preventDefault();
  };

  onDrop = (evt, laneId) => {
    const id = +evt.dataTransfer.getData("id");

    const tickets = this.state.tickets.filter((ticket) => {
      if (ticket.id === id) {
        ticket.lane = laneId;
      }
      return ticket;
    });

    this.setState({
      ...this.state,
      tickets,
    });
  };

  render() {
    const { loading, error, lanes } = this.props;
    const { tickets } = this.state;
    return (
      <BoardWrapper>
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            title={lane.title}
            loading={loading}
            tickets={tickets.filter((ticket) => ticket.lane === lane.id)}
            error={error}
            onDragStart={this.onDragStart}
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}
          />
        ))}
      </BoardWrapper>
    );
  }
}

export default withDataFetching(Board);
