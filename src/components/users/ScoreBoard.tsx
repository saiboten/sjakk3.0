import React from "react";

import firebase from "../firebase/FirebaseInit";
import { User } from "../../types";

interface Props {}

interface State {
  users: User[];
}

class ScoreBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("users")
      .on("value", snapshot => {
        const users = snapshot && snapshot.val();
        this.setState({
          users: Object.values(users)
        });
      });
  }

  render() {
    let copyList = this.state.users.slice();

    copyList = copyList.sort((a: User, b: User) => a.rating - b.rating);

    const scoreboardlist = copyList
      .filter(user => user.matches && user.matches.length > 0)
      .map(user => (
        <li key={user.id}>
          {user.name} - {user.rating}
        </li>
      ));

    return (
      <div>
        <h1>Ratingoversikt</h1>
        <ul className="flex-column">{scoreboardlist}</ul>
      </div>
    );
  }
}

export default ScoreBoard;
