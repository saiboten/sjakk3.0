import React from "react";
import { string, oneOfType, array, any } from "prop-types";

require("./container.css");

class Container extends React.PureComponent {
  render() {
    return <div className="sjakk-main__container">{this.props.children}</div>;
  }
}

export default Container;
