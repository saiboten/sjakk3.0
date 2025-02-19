import React from "react";

import firebase from "../firebase/FirebaseInit";
import { connect } from "react-redux";
import { logIn } from "../../state/actions/loggedin";
import { AppState } from "../../types";
import { StyledContainer } from "../styled/StyledContainer";

interface Props {
  logMeIn: () => void;
}

interface State {
  user: string;
  password: string;
  feedback: string;
  loggedin: boolean;
}

class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      feedback: "",
      loggedin: false,
    };
    this.updateUserState = this.updateUserState.bind(this);
    this.updatePasswordState = this.updatePasswordState.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.authChangeListener = this.authChangeListener.bind(this);

    this.authChangeListener();
  }

  updateUserState(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      user: e.target.value,
    });
  }

  updatePasswordState(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      password: e.target.value,
    });
  }

  logIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    this.setState({
      feedback: "",
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.user, this.state.password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode) {
          this.setState({
            feedback: "Klarte ikke å logge deg inn, beklager det.",
          });
        }
      });
  }

  logOut(e: React.ChangeEvent<HTMLButtonElement>) {
    e.preventDefault();

    this.setState({
      feedback: "",
      password: "",
    });

    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.setState({
            feedback: "Du er nå logget ut",
          });
        },
        (error) => {
          this.setState({
            feedback: "Klarte ikke å logge deg ut, beklager det!",
          });
        }
      );
  }

  authChangeListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedin: true,
        });
      }
    });
  }

  render() {
    return (
      <StyledContainer>
        <form className="select-user__form" onSubmit={this.logIn}>
          <div className="smallspace">Brukernavn</div>
          <input className="smallspace" value={this.state.user} onChange={this.updateUserState} />
          <div className="smallspace">Passord</div>
          <input
            type="password"
            className="smallspace"
            value={this.state.password}
            onChange={this.updatePasswordState}
          />
          <div className="flex-row space-between">
            <input className="button" type="submit" value="Logg inn" />
          </div>
        </form>
        {this.state.feedback}
      </StyledContainer>
    );
  }
}

export const Login = connect(
  (state: AppState) => ({}),
  (dispatch: any) => ({
    logMeIn: () => dispatch(logIn()),
  })
)(LoginComponent);
