import React from "react";
import { connect } from "react-redux";
import UserMatchesList from "./UserMatchesList";
import { Match, User, AppState } from "../../types";
import { RouteComponentProps } from "react-router";
import { StyledContainer } from "../styled/StyledContainer";

interface MatchParams {
  id: string;
}

interface Props extends RouteComponentProps<MatchParams> {
  matches: any;
  tournaments: any;
  users: any;
  user: User;
}

interface State {}

class UserStatistics extends React.Component<Props, State> {
  render() {
    const { matches, tournaments, users, match, user } = this.props;

    if (!user) {
      return <React.Fragment />;
    }

    const userId = match.params.id;

    let matchesPlayed = 0;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let winsAsWhite = 0;
    let winsAsBlack = 0;

    if (matches && users && users[userId] && users[userId].matches) {
      let userMatches = users[userId].matches.map((onematch: string) => {
        return matches[onematch];
      });

      userMatches = userMatches.filter((xyz: Match) => xyz && xyz.completed);

      wins = userMatches.reduce((wonMatches: number, oneMatch: Match) => {
        let won = 0;
        if (oneMatch.white === userId && oneMatch.whiteWon) {
          won = 1;
        } else if (oneMatch.black === userId && oneMatch.blackWon) {
          won = 1;
        }
        return wonMatches + won;
      }, 0);

      losses = userMatches.reduce((lostMatches: number, oneMatch: Match) => {
        let lost = 0;
        if (oneMatch.white === userId && oneMatch.blackWon) {
          lost = 1;
        } else if (oneMatch.black === userId && oneMatch.whiteWon) {
          lost = 1;
        }
        return lostMatches + lost;
      }, 0);

      ties = userMatches.reduce((tiedMatches: number, oneMatch: Match) => tiedMatches + (oneMatch.remis ? 1 : 0), 0);

      winsAsBlack = userMatches.reduce(
        (gamesTotal: number, oneMatch: Match) => gamesTotal + (oneMatch.black === userId && oneMatch.blackWon ? 1 : 0),
        0
      );

      winsAsWhite = userMatches.reduce(
        (gamesTotal: number, oneMatch: Match) => gamesTotal + (oneMatch.white === userId && oneMatch.whiteWon ? 1 : 0),
        0
      );

      matchesPlayed = userMatches.length;
    }

    return (
      <StyledContainer>
        <h1>Brukerstatistikk for {user.name}</h1>
        <ul className="flex-column">
          <li>Rating: {user.rating}</li>
          <li>Antall kamper: {matchesPlayed}</li>
          <li>Seire: {wins}</li>
          <li>Tap: {losses}</li>
          <li>Remis: {ties}</li>
          <br />
          <li>Seire som hvit: {winsAsWhite}</li>
          <li>Seire som sort: {winsAsBlack}</li>
        </ul>

        <ul>
          <h1>Kamper</h1>
          {users[userId] && users[userId].matches ? (
            <UserMatchesList tournaments={tournaments} matches={matches} users={users} user={userId} />
          ) : (
            ""
          )}
        </ul>
      </StyledContainer>
    );
  }
}

interface OwnProps {
  label: string;
}

export default connect(
  (state: AppState, ownProps: any) => {
    const {
      tournaments: { tournaments },
      users: { users },
      matches: { matches }
    } = state;

    const user: User = users[ownProps.match.params.id];

    return {
      matches,
      users,
      user,
      tournaments
    };
  },
  dispatch => ({})
)(UserStatistics);
