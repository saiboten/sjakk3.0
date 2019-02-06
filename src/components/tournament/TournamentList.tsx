import React from "react";

import { Link } from "react-router-dom";
import { Tournament } from "../../types";
import moment from "moment";

interface Props {
  tournaments: Tournament[];
}

class TournamentList extends React.Component<Props> {
  render() {
    return (
      <ul className="flex-column">
        {this.props.tournaments.map((tournament, id) => (
          <Link key={id} className="smallspace button" to={`/tournament/${tournament.id}`}>
            {tournament.name} {moment(tournament.date).format("DD.MM.YYYY")}
          </Link>
        ))}
      </ul>
    );
  }
}

export default TournamentList;
