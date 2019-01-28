import React from "react";

import UpcomingMatch from "./UpcomingMatch";
import CompletedMatch from "./CompletedMatch";
import { Match, User } from "../../types";

interface matchesDict {
  [matchid: string]: Match;
}

interface UsersDict {
  [userid: string]: User;
}

interface Props {
  matches: matchesDict;
  matchesIDs: string[];
  tournament: string;
  users: UsersDict;
}

class MatchList extends React.Component<Props> {
  render() {
    const matchList = this.props.matchesIDs.map((matchID: string) => {
      let matchJsx;

      const match = this.props.matches[matchID];

      if (match) {
        if (match.completed) {
          matchJsx = (
            <CompletedMatch
              tournament={this.props.tournament}
              white={this.props.users[match.white]}
              black={this.props.users[match.black]}
              key={match.id}
              match={match}
            />
          );
        } else {
          matchJsx = (
            <UpcomingMatch
              tournament={this.props.tournament}
              white={this.props.users[match.white]}
              black={this.props.users[match.black]}
              key={match.id}
              match={match}
            />
          );
        }
        return matchJsx;
      }

      return undefined;
    });

    return <ul className="smallspace">{matchList}</ul>;
  }
}

export default MatchList;
