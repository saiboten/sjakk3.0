import React from "react";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import { createStore, combineReducers } from "redux";
import createHistory from "history/createBrowserHistory";

import { Provider } from "react-redux";

import firebase from "./components/firebase/FirebaseInit";
import { setUsers } from "./state/actions/user";
import { setTournaments } from "./state/actions/tournaments";
import { setMatches } from "./state/actions/matches";
import { tournaments, matches, users } from "./state/reducers";
import { LoadedWrapper } from "./LoadedWrapper";

const history = createHistory();

/* eslint-disable no-underscore-dangle */
let store = createStore(
  combineReducers({
    tournaments,
    matches,
    users
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  //compose(applyMiddleware(middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
/* eslint-enable */

require("./global.css");
/*eslint-disable */
// require('babel-polyfill');
/*eslint-enable */

moment.locale("nb_NO");

const database = firebase.database();

const usersRef = database.ref("users");

usersRef.on(
  "value",
  snapshot => {
    if (snapshot && snapshot.val()) {
      store.dispatch(setUsers(snapshot.val()));
    }
  },
  (error: any) => {
    console.log(error);
  }
);

const matchesRef = database.ref("matches");
matchesRef.on(
  "value",
  snapshot => {
    if (snapshot && snapshot.val()) {
      store.dispatch(setMatches(snapshot.val()));
    }
  },
  (error: any) => {
    console.log(error);
  }
);

const tournamentsRef = database.ref("tournaments");
tournamentsRef.on("value", snapshot => {
  if (snapshot && snapshot.val()) {
    store.dispatch(setTournaments(snapshot.val()));
  }
});

const App = () => (
  <Provider store={store}>
    <LoadedWrapper />
  </Provider>
);

export default App;
