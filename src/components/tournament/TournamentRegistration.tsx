import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import firebase from "../firebase/FirebaseInit";
import { User } from "../../types";
import { string } from "prop-types";

const uuidv1 = require("uuid/v1");

interface Callback {
  date: string;
  host: string;
  name: string;
  id: string;
}

interface Props {
  callback: (input: Callback) => void;
}

interface State {
  name: string;
  host: string;
  date: any;
  users: User[];
}

class TournamentRegistration extends React.Component<Props, State> {
  fireBaseUser: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      host: "",
      date: moment().toDate(),
      users: []
    };

    this.submit = this.submit.bind(this);
    this.nameChanged = this.nameChanged.bind(this);
    this.hostChanged = this.hostChanged.bind(this);
    this.dateChanged = this.dateChanged.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount() {
    this.loadUsers();
  }

  componentWillUnmount() {
    this.fireBaseUser.off();
  }

  loadUsers() {
    this.fireBaseUser = firebase.database().ref("users");
    this.fireBaseUser.on("value", (snapshot: any) => {
      if (snapshot.val()) {
        this.setState({
          users: Object.values(snapshot.val())
        });
      }
    });
  }

  dateChanged(date: Date) {
    this.setState({
      date
    });
  }

  nameChanged(e: any) {
    this.setState({
      name: e.target.value
    });
  }

  hostChanged(e: any) {
    this.setState({
      host: e.target.value
    });
  }

  submit(e: any) {
    e.preventDefault();
    this.props.callback({
      date: moment(this.state.date).format(),
      host: this.state.host,
      name: this.state.name,
      id: uuidv1()
    });
  }

  render() {
    const options = this.state.users.map(user => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    return (
      <form onSubmit={this.submit}>
        <div className="flex-row space-between smallspace">
          <label htmlFor="name">Navn</label>
          <input
            id="name"
            onChange={this.nameChanged}
            value={this.state.name}
          />
        </div>
        <div className="flex-row space-between smallspace">
          <label htmlFor="host">Vert</label>
          <select value={this.state.host} onChange={this.hostChanged}>
            {options}
          </select>
        </div>
        <div className="flex-row space-between smallspace">
          <label htmlFor="date">Dato</label>
          <DatePicker
            id="date"
            selected={this.state.date}
            onChange={this.dateChanged}
          />
        </div>
        <input className="button" type="submit" value="Legg til" />
      </form>
    );
  }
}

export default TournamentRegistration;
