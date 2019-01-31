import React from "react";
import { Link } from "react-router-dom";

import Container from "../container/Container";

require("./choosepath.css");

class ChoosePath extends React.Component {
  render() {
    return (
      <Container>
        <div className="flex-column">
          <Link className="smallspace button" to="/users">
            Brukere
          </Link>
          <Link className="smallspace button" to="/tournaments">
            Turneringer
          </Link>
        </div>
      </Container>
    );
  }
}

export default ChoosePath;
