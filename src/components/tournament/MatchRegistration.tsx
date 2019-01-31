import React from "react";
import moment from "moment";

import firebase from "../firebase/FirebaseInit";
import { User } from "../../types";

interface Callback {
  white: string;
  black: string;
  date: any;
}

interface Props {
  users: User[];
  callback: (inp: Callback) => void;
}

interface State {
  black: string;
  white: string;
  date: any;
  feedback: string;
}

class MatchRegistration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      black: props.users[0].id,
      white: props.users[0].id,
      date: moment(),
      feedback: ""
    };

    this.submit = this.submit.bind(this);
    this.whiteChanged = this.whiteChanged.bind(this);
    this.blackChanged = this.blackChanged.bind(this);
  }

  whiteChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      white: e.target.value,
      feedback: ""
    });
  }

  blackChanged(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({
      black: e.target.value,
      feedback: ""
    });
  }

  submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (this.state.black === this.state.white) {
      this.setState({
        feedback: "En spiller kan ikke spille mot seg selv"
      });
    } else {
      this.props.callback({
        white: this.state.white,
        black: this.state.black,
        date: this.state.date.format()
      });
    }
  }

  render() {
    const options = this.props.users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    return (
      <form onSubmit={this.submit}>
        <div className="flex-column space-between smallspace">
          <label className="smallspace" htmlFor="white">
            Hvit
          </label>
          <select value={this.state.white} onChange={this.whiteChanged}>
            {options}
          </select>
          <label className="smallspace" htmlFor="black">
            Svart
          </label>
          <select value={this.state.black} onChange={this.blackChanged}>
            {options}
          </select>
        </div>
        <input className="button" type="submit" value="Legg til kamp" />
        <p>{this.state.feedback}</p>
      </form>
    );
  }
}

export default MatchRegistration;
