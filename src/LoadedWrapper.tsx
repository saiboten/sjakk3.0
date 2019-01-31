import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AppState } from "./types";

import Login from "./components/login/Login";
import TournamentPage from "./components/tournament/TournamentPage";
import ChoosePath from "./components/choosepath/ChoosePath";
import { UserPageWrapper } from "./components/users/UsersPageWrapper";
import Tournament from "./components/tournament/Tournament";
import UserStatistics from "./components/users/UserStatistics";

const LoadedWrapperComp = ({ ready }: { ready: boolean }) => {
  if (!ready) {
    return <p>Laster</p>;
  }

  return (
    <Router>
      <div>
        <Route path="/" component={ChoosePath} />
        <Route path="/login" component={Login} />
        <Route path="/tournaments" component={TournamentPage} />
        <Route path="/users" component={UserPageWrapper} />
        <Route path="/tournament/:id" component={Tournament} />
        <Route path="/user/:id" component={UserStatistics} />
      </div>
    </Router>
  );
};

export const LoadedWrapper = connect(
  (state: AppState) => {
    const ready =
      state.matches.loaded && state.tournaments.loaded && state.users.loaded;
    return {
      ready
    };
  },
  null
)(LoadedWrapperComp);
