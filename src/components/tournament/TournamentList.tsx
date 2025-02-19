import React from "react";

import { Tournament } from "../../types";
import moment from "moment";
import { NavLink } from "react-router";

interface Props {
  tournaments: Tournament[];
}

class TournamentList extends React.Component<Props> {
  render() {
    return (
      <ul className="flex-column">
        {this.props.tournaments.map((tournament, id) => (
          <NavLink key={id} className="smallspace button" to={`/tournament/${tournament.id}`}>
            {tournament.name} {moment(tournament.date).format("DD.MM.YYYY")}
          </NavLink>
        ))}
      </ul>
    );
  }
}

export default TournamentList;
