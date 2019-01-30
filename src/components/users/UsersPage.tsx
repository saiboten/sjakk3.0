import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "../container/Container";
import ScoreBoard from "./ScoreBoard";
import AddUserForm from "./AddUserForm";
import { AppState } from "../../types";

const UsersPage = ({ users }: any) => {
  const userList = Object.values(users);
  const usersElements = userList.map((user: any) => (
    <li key={user.id}>
      <Link key={user.id} to={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ));

  return (
    <Container>
      <ScoreBoard />
      <AddUserForm />
      <h1>Brukere</h1>
      <ul className="flex-column space-between">{usersElements}</ul>
    </Container>
  );
};

export default connect(
  (state: AppState) => {
    const {
      users: { users }
    } = state;
    return {
      users
    };
  },
  dispatch => ({})
)(UsersPage);
