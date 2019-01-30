import { connect } from "react-redux";

import UsersPage from "./UsersPage";
import { AppState } from "../../types";

export const UserPageWrapper = connect(
  (state: AppState) => {
    const { users } = state;
    return {
      users
    };
  },
  dispatch => ({})
)(UsersPage);
