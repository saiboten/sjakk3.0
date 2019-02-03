import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ScoreBoard from "./ScoreBoard";
import AddUserForm from "./AddUserForm";
import { AppState } from "../../types";
import { StyledContainer } from "../styled/StyledContainer";

const UsersPage = ({ loggedin }: any) => {
  return (
    <StyledContainer>
      <ScoreBoard />
      {loggedin && <AddUserForm />}
    </StyledContainer>
  );
};

export default connect(
  (state: AppState) => {
    const { loggedin } = state;
    return {
      loggedin
    };
  },
  dispatch => ({})
)(UsersPage);
