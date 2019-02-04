import React from "react";
import { connect } from "react-redux";
import UserMatchesList from "./UserMatchesList";
import { Match, User, AppState } from "../../types";
import { RouteComponentProps } from "react-router";
import { StyledContainer } from "../styled/StyledContainer";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

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
    const userId = match.params.id;

    if (!user || !matches || !users[userId] || !users[userId].matches) {
      return <React.Fragment />;
    }

    let matchesPlayed = 0;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let winsAsWhite = 0;
    let winsAsBlack = 0;

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

    const chartData = userMatches.map((match: Match, index: number) => ({
      name: `${index}`,
      a:
        match.white === userId
          ? match.whiteInitialRating + match.whiteRatingChange
          : match.blackInitialRating + match.blackRatingChange
    }));

    const minRating = userMatches.reduce(
      (lowest: number, match: Match) =>
        match.white === userId
          ? Math.min(lowest, match.whiteInitialRating + match.whiteRatingChange)
          : Math.min(lowest, match.blackInitialRating + match.blackRatingChange),
      Number.MAX_SAFE_INTEGER
    );

    const maxRating = userMatches.reduce(
      (highest: number, match: Match) =>
        match.white === userId
          ? Math.max(highest, match.whiteInitialRating + match.whiteRatingChange)
          : Math.max(highest, match.blackInitialRating + match.blackRatingChange),
      Number.MIN_SAFE_INTEGER
    );

    return (
      <StyledContainer>
        <h1>Brukerstatistikk for {user.name}</h1>

        <LineChart width={730} height={250} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis />
          <YAxis dataKey="a" type="number" domain={["dataMin - 100", "dataMax + 100"]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="a" stroke="#8884d8" />
        </LineChart>

        <ul className="flex-column">
          <li>Rating: {user.rating}</li>
          <li>Høyeste rating {maxRating}</li>
          <li>Laveste rating: {minRating}</li>
          <br />
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
