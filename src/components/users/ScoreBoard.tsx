import React from "react";
import styled from "styled-components";

import { User, AppState, UserDict } from "../../types";
import { connect } from "react-redux";
import { NavLink } from "react-router";

interface Props {
  users: UserDict;
}

const StyledListElement = styled(NavLink)`
  width: 100%;
  display: flex;
  padding: 5px 0;
  justify-content: space-around;
  border-left: 1px solid #b7b7b7;
  border-right: 1px solid #b7b7b7;

  &:visited,
  &:link {
    text-decoration: none;
    color: inherit;
    font-size: 20px;
  }

  &:nth-child(odd) {
    background-color: #b7b7b7;
  }

  &:last-child {
    border-bottom: 1px solid #b7b7b7;
  }

  &:hover {
    background-color: grey;
  }
`;

const StyledName = styled.span`
  flex-basis: 50%;
  text-align: center;
`;

const StyledRating = styled.span`
  flex-basis: 50%;
  text-align: center;
`;

class ScoreBoard extends React.Component<Props> {
  render() {
    const sortedList = [...Object.values(this.props.users)].sort((a: User, b: User) => b.rating - a.rating);

    const scoreboardlist = sortedList
      .filter((user: User) => user.matches && Object.keys(user.matches).length > 0)
      .map((user) => (
        <StyledListElement key={user.id} to={`/user/${user.id}`}>
          <StyledName>{user.name}</StyledName>
          <StyledRating>{user.rating}</StyledRating>
        </StyledListElement>
      ));

    return (
      <div>
        <h1>Ratingoversikt</h1>
        <div className="flex-column">{scoreboardlist}</div>
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    users: state.users.users,
  }),
  null
)(ScoreBoard);
