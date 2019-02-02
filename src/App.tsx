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
import { tournaments, matches, users, loggedin } from "./state/reducers";
import { LoadedWrapper } from "./LoadedWrapper";
import { logIn } from "./state/actions/loggedin";

const history = createHistory();

/* eslint-disable no-underscore-dangle */
let store = createStore(
  combineReducers({
    tournaments,
    matches,
    users,
    loggedin
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

database.ref("users").on(
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

database.ref("matches").on(
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

database.ref("tournaments").on("value", snapshot => {
  if (snapshot && snapshot.val()) {
    store.dispatch(setTournaments(snapshot.val()));
  }
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(logIn());
  }
});

const App = () => (
  <Provider store={store}>
    <LoadedWrapper />
  </Provider>
);

export default App;
