import React from "react";

import TournamentRegistration from "./TournamentRegistration";
import TournamentList from "./TournamentList";
import firebase from "../firebase/FirebaseInit";
import Container from "../container/Container";
import { any } from "prop-types";
import { TournamentDict } from "../../types";

interface Props {}

interface State {
  tournaments: TournamentDict;
}

class TournamentPage extends React.Component<Props, State> {
  tournaments: any;

  static tournamentAdded(tournament: any) {
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
    return (
      <Container>
        <h1>Registrer turnering</h1>
        <TournamentRegistration callback={TournamentPage.tournamentAdded} />
        <h1>Turneringsliste</h1>
        <TournamentList tournaments={Object.values(this.state.tournaments)} />
      </Container>
    );
  }
}

export default TournamentPage;
