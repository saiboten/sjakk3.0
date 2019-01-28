import React from "react";
import { Link } from "react-router-dom";

import Container from "../container/Container";

require("./choosepath.css");

class ChoosePath extends React.Component {
  render() {
    return (
      <Container>
        <h1>Hva vil du gjøre?</h1>

        <div>
          <Link className="smallspace button" to="/adduser">
            Legg til bruker
          </Link>
          <Link className="smallspace button" to="/tournaments">
            Turneringer
          </Link>
          <Link className="smallspace button" to="/statistics">
            Statistikk
          </Link>
        </div>
      </Container>
    );
  }
}

export default ChoosePath;
