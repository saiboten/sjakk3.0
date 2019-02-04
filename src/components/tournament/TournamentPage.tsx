import React from "react";

import { connect } from "react-redux";
import TournamentRegistration, { NewTournamentData } from "./TournamentRegistration";
import TournamentList from "./TournamentList";
import firebase from "../firebase/FirebaseInit";
import { TournamentDict, AppState } from "../../types";
import { StyledContainer } from "../styled/StyledContainer";

interface Props {
  loggedin: boolean;
}

interface State {
  tournaments: TournamentDict;
}

class TournamentPage extends React.Component<Props, State> {
  tournaments: any;

  static tournamentAdded(tournament: NewTournamentData) {
    firebase
      .database()
      .ref(`tournaments/${tournament.id}`)
      .set(tournament);
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      tournaments: {}
    };
  }

  componentDidMount() {
    this.setupTournamentListener();
  }

  componentWillUnmount() {
    this.tournaments.off();
  }

  setupTournamentListener() {
    this.tournaments = firebase.database().ref("tournaments");
    this.tournaments.on("value", (snapshot: any) => {
      if (snapshot.val()) {
        this.setState({
          tournaments: snapshot.val()
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
        <TournamentList tournaments={Object.values(this.state.tournaments)} />
      </>
    );
  }
}

export default connect(
  (state: AppState) => {
    return {
      loggedin: state.loggedin
    };
  },
  null
)(TournamentPage);
