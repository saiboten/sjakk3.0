import React from "react";
import { any } from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Container from "../container/Container";
import ScoreBoard from "./ScoreBoard";
import AddUserForm from "./AddUserForm";
import { User } from "../../types";

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
  ({ users: { users } }: any) => ({
    users
  }),
  dispatch => ({})
)(UsersPage);
