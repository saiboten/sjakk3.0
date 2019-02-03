import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ScoreBoard from "./ScoreBoard";
import AddUserForm from "./AddUserForm";
import { AppState } from "../../types";
import { StyledContainer } from "../styled/StyledContainer";

const UsersPage = ({ users, loggedin }: any) => {
  const userList = Object.values(users);
  const usersElements = userList.map((user: any) => (
    <li key={user.id}>
      <Link key={user.id} to={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ));

  return (
    <StyledContainer>
      <ScoreBoard />
      {loggedin && <AddUserForm />}
      <h1>Brukere</h1>
      <ul className="flex-column space-between">{usersElements}</ul>
    </StyledContainer>
  );
};

export default connect(
  (state: AppState) => {
    const {
      users: { users },
      loggedin
    } = state;
    return {
      users,
      loggedin
    };
  },
  dispatch => ({})
)(UsersPage);
