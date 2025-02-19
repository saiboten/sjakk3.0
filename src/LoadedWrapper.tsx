import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router";
import { AppState } from "./types";

import { Login } from "./components/login/Login";
import ChoosePath from "./components/choosepath/ChoosePath";
import { UserPageWrapper } from "./components/users/UsersPageWrapper";
import { Tournament } from "./components/tournament/Tournament";
import UserStatistics from "./components/users/UserStatistics";
import { Loader } from "./components/Loader";

const LoadedWrapperComp = ({ ready }: { ready: boolean }) => {
  if (!ready) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <ChoosePath />
      <Routes>
        <Route path="/" element={<UserPageWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tournament/:id" element={<Tournament />} />
        <Route path="/user/:id" element={<UserStatistics />} />
      </Routes>
    </BrowserRouter>
  );
};

export const LoadedWrapper = connect((state: AppState) => {
  const ready = state.matches.loaded && state.tournaments.loaded && state.users.loaded;
  return {
    ready,
  };
}, null)(LoadedWrapperComp);
