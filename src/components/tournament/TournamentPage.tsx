import React from "react";

import moment from "moment";
import { connect } from "react-redux";
import TournamentRegistration, { NewTournamentData } from "./TournamentRegistration";
import TournamentList from "./TournamentList";
import { TournamentDict, AppState, Tournament } from "../../types";
import { get, getDatabase, off, ref, set } from "firebase/database";
import { app } from "../firebase/FirebaseInit";

interface Props {
  loggedin: boolean;
}

interface State {
  tournaments: TournamentDict;
}

function sortTournamentByDate(inputList: Tournament[]) {
  return inputList.sort((tournament1: Tournament, tournament2: Tournament) =>
    moment.utc(tournament2.date).diff(moment.utc(tournament1.date))
  );
}

class TournamentPage extends React.Component<Props, State> {
  tournaments: any;

  static tournamentAdded(tournament: NewTournamentData) {
    set(ref(getDatabase(app), `tournaments/${tournament.id}`), tournament);
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      tournaments: {},
    };
  }

  componentDidMount() {
    this.setupTournamentListener();
  }

  componentWillUnmount() {
    off(this.tournaments);
  }

  setupTournamentListener() {
    this.tournaments = ref(getDatabase(app), "tournaments");
    get(this.tournaments).then((snapshot) => {
      if (snapshot.val()) {
        this.setState({
          tournaments: snapshot.val(),
        });
      }
    });
  }

  render() {
    const { loggedin } = this.props;

    return (
      <>
        {loggedin && (
          <>
            <h1>Registrer turnering</h1>
            <TournamentRegistration callback={TournamentPage.tournamentAdded} />
          </>
        )}

        <h1>Turneringsliste</h1>
        <TournamentList tournaments={sortTournamentByDate(Object.values(this.state.tournaments))} />
      </>
    );
  }
}

export default connect((state: AppState) => {
  return {
    loggedin: state.loggedin,
  };
}, null)(TournamentPage);
