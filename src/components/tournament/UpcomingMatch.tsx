import React from "react";

import firebase from "../firebase/FirebaseInit";
import ScoreCalculator from "./ScoreCalculator";
import MatchHelper from "./MatchHelper";
import { isPropertySignature } from "typescript";
import { Match, User } from "../../types";
import { RouteComponentProps } from "react-router";

require("./upcomingmatch.css");

interface UsersDict {
  [userid: string]: User;
}

interface matchesDict {
  [matchid: string]: Match;
}

interface Props {
  matches: matchesDict;
  matchesIDs: string[];
  tournament: string;
  users: UsersDict;
  white: User;
  black: User;
  match: Match;
}

interface State {
  blackWonConfirmed: boolean;
  confirmedDelete: boolean;
  remisConfirmed: boolean;
  winner: string;
  whiteWonConfirmed: boolean;
}

class UpcomingMatch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      winner: "white",
      remisConfirmed: false,
      whiteWonConfirmed: false,
      blackWonConfirmed: false,
      confirmedDelete: false
    };

    this.storeWinner = this.storeWinner.bind(this);
    this.remisConfirm = this.remisConfirm.bind(this);
    this.blackWon = this.blackWon.bind(this);
    this.whiteWon = this.whiteWon.bind(this);
    this.cancelConfirmDelete = this.cancelConfirmDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete() {
    if (this.state.confirmedDelete) {
      this.deleteMatch();
    }

    this.setState({
      confirmedDelete: true
    });
  }

  cancelConfirmDelete() {
    this.setState({
      confirmedDelete: false
    });
  }

  remisConfirm() {
    if (this.state.remisConfirmed) {
      this.storeWinner("remis");
    }
    this.setState({
      remisConfirmed: true,
      whiteWonConfirmed: false,
      blackWonConfirmed: false
    });
  }

  blackWon() {
    if (this.state.blackWonConfirmed) {
      this.storeWinner("black");
    }
    this.setState({
      blackWonConfirmed: true,
      whiteWonConfirmed: false,
      remisConfirmed: false
    });
  }

  whiteWon() {
    if (this.state.whiteWonConfirmed) {
      this.storeWinner("white");
    }
    this.setState({
      whiteWonConfirmed: true,
      blackWonConfirmed: false,
      remisConfirmed: false
    });
  }

  storeWinner(winner: string) {
    ScoreCalculator.calculateScore(
      this.props.white,
      this.props.black,
      this.props.match,
      winner
    );
  }

  deleteMatch() {
    firebase
      .database()
      .ref(`matches/${this.props.match.id}`)
      .once("value", snapshot => {
        MatchHelper.deleteListElementFromList(
          `tournaments/${this.props.tournament}/matches`,
          this.props.match.id
        );
        MatchHelper.deleteListElementFromList(
          `users/${this.props.match.white}/matches`,
          this.props.match.id
        );
        MatchHelper.deleteListElementFromList(
          `users/${this.props.match.black}/matches`,
          this.props.match.id
        );
        firebase
          .database()
          .ref(`matches/${this.props.match.id}`)
          .remove();
      });
  }

  render() {
    const match = this.props.match;

    let renderThis = <li>Laster</li>;

    const displayNone = {
      display: "none"
    };

    let confirmDeleteMatchButton = <span style={displayNone} />;

    if (this.state.confirmedDelete) {
      confirmDeleteMatchButton = (
        <button className="button" onClick={this.cancelConfirmDelete}>
          N
        </button>
      );
    }

    if (this.props.white) {
      renderThis = (
        <li className="flex-row space-between smallspace" key={match.id}>
          <button
            className={
              this.state.whiteWonConfirmed
                ? "completedMatch__won upcomingMatch__player__button"
                : "completedMatch__tie upcomingMatch__player__button"
            }
            onClick={this.whiteWon}
          >
            <div className="flex-column">
              <div className="completedMatch__names">
                {this.props.white.name}
              </div>
              <div className="completedMatch__rating">
                {this.props.white.rating}{" "}
              </div>
            </div>
          </button>
          <button
            className={
              this.state.blackWonConfirmed
                ? "completedMatch__won upcomingMatch__player__button"
                : "completedMatch__tie upcomingMatch__player__button"
            }
            onClick={this.blackWon}
          >
            <div className="flex-column">
              <div className="completedMatch__names">
                {this.props.black.name}
              </div>
              <div className="completedMatch__rating">
                {" "}
                {this.props.black.rating}
              </div>
            </div>
          </button>
          <button
            className="flex-column button upcomingMatch__remis_button"
            onClick={this.remisConfirm}
          >
            {this.state.remisConfirmed ? "Bekreft" : "Remis"}
          </button>
          <span className="flex-column">
            <button className="button" onClick={this.confirmDelete}>
              {this.state.confirmedDelete ? "Y" : "X"}
            </button>
            {confirmDeleteMatchButton}
          </span>
        </li>
      );
    }

    return renderThis;
  }
}

export default UpcomingMatch;
