import React from "react";

import firebase from "../firebase/FirebaseInit";

interface Props {}

interface State {
  name: string;
  email: string;
}

interface NewName {
  name: string;
  email: string;
}

class AddUserForm extends React.Component<Props, State> {
  static nameAdded(data: NewName) {
    const user = {
      name: data.name,
      id: data.email.replace(/\./, "-dot-"),
      rating: 1200
    };

    firebase
      .database()
      .ref(`users/${user.id}`)
      .set(user);
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };

    this.nameChange = this.nameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    AddUserForm.nameAdded({
      name: this.state.name,
      email: this.state.email
    });
    this.setState({
      name: "",
      email: ""
    });
  }

  nameChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  emailChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      email: e.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="flex-column space-between smallspace">
          <h1>Legg til ny bruker</h1>
          <label htmlFor="name">Navn</label>
          <input onChange={this.nameChange} id="name" value={this.state.name} />
          <label htmlFor="email">Email</label>
          <input
            onChange={this.emailChange}
            id="email"
            value={this.state.email}
          />
        </div>
        <input className="button" type="submit" value="Legg til bruker" />
      </form>
    );
  }
}

export default AddUserForm;
