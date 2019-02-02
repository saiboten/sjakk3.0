import React from "react";

import firebase from "../firebase/FirebaseInit";
import MatchHelper from "./MatchHelper";
import { Match, User, AppState } from "../../types";
import { connect } from "react-redux";

require("./completedmatch.css");

interface Props {
  match: Match;
  tournament: string;
  white: User;
  black: User;
  loggedin: boolean;
}

interface State {
  confirmedDelete: boolean;
}

class CompletedMatch extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.deleteMatch = this.deleteMatch.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelConfirmDelete = this.cancelConfirmDelete.bind(this);
    this.restoreUserRatings = this.restoreUserRatings.bind(this);

    this.state = {
      confirmedDelete: false
    };
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

  restoreUserRatings() {
    firebase
      .database()
      .ref(`users/${this.props.match.white}`)
      .once("value", snapshotUser => {
        const theUser = snapshotUser.val();
        theUser.rating -= this.props.match.whiteRatingChange;
        firebase
          .database()
          .ref(`users/${this.props.match.white}`)
          .set(theUser);
      });

    firebase
      .database()
      .ref(`users/${this.props.match.black}`)
      .once("value", snapshotUser => {
        const theUser = snapshotUser.val();
        theUser.rating -= this.props.match.blackRatingChange;

        firebase
          .database()
          .ref(`users/${this.props.match.black}`)
          .set(theUser);
      });
  }

  deleteMatch() {
    firebase
      .database()
      .ref(`matches/${this.props.match.id}`)
      .once("value", snapshot => {
        MatchHelper.deleteListElementFromList(`tournaments/${this.props.tournament}/matches`, this.props.match.id);
        MatchHelper.deleteListElementFromList(`users/${this.props.match.white}/matches`, this.props.match.id);
        MatchHelper.deleteListElementFromList(`users/${this.props.match.black}/matches`, this.props.match.id);
        firebase
          .database()
          .ref(`matches/${this.props.match.id}`)
          .remove();

        if (this.props.match.completed) {
          this.restoreUserRatings();
        }
      });
  }

  findPlayerCssClass(white: boolean) {
    const match = this.props.match;

    const youWon = (white && match.whiteWon) || (!white && match.blackWon);
    const youLost = (white && match.blackWon) || (!white && match.whiteWon);

    if (youWon) {
      return "completedMatch__won";
    } else if (youLost) {
      return "completedMatch__lost";
    }
    return "completedMatch__tie";
  }

  render() {
    const match = this.props.match;
    const { loggedin } = this.props;

    const displayNone = {
      display: "none"
    };

    let confirmDeleteMatchButton = <span style={displayNone} />;
    if (this.state.confirmedDelete) {
      confirmDeleteMatchButton = (
        <button className="button completedMatch__deleteMatch__button" onClick={this.cancelConfirmDelete}>
          Avbryt
        </button>
      );
    }

    return (
      <li className="flex-row space-between smallspace" key={match.id}>
        <span className={this.findPlayerCssClass(true)}>
          <div className="flex-column">
            <div className="completedMatch__names">{this.props.white.name}</div>
            <div className="completedMatch__rating">
              {match.whiteInitialRating + match.whiteRatingChange}{" "}
              {match.whiteRatingChange > 0 ? `+${match.whiteRatingChange}` : match.whiteRatingChange}{" "}
            </div>
          </div>
        </span>
        <span className={this.findPlayerCssClass(false)}>
          <div className="flex-column">
            <div className="completedMatch__names">{this.props.black.name}</div>
            <div className="completedMatch__rating">
              {" "}
              {match.blackInitialRating + match.blackRatingChange}{" "}
              {match.blackRatingChange > 0 ? `+${match.blackRatingChange}` : match.blackRatingChange}{" "}
            </div>
          </div>
        </span>
        <span className="flex-column space-between">
          {loggedin && (
            <>
              <button className="completedMatch__deleteMatch__button button" onClick={this.confirmDelete}>
                {this.state.confirmedDelete ? "Bekreft" : "Slett"}
              </button>
              {confirmDeleteMatchButton}
            </>
          )}
        </span>
      </li>
    );
  }
}

export default connect(
  (state: AppState) => ({
    loggedin: state.loggedin
  }),
  null
)(CompletedMatch);
