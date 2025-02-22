import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { StyledContainer } from "../styled/StyledContainer";

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setLoggedIn(true);
  //     }
  //   });
  // }, []);

  function logIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFeedback("");

    firebase
      .auth()
      .signInWithEmailAndPassword(user, password)
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode) {
          setFeedback("Klarte ikke å logge deg inn, beklager det." + errorCode + error.message);
        }
      });
  }

  // function logOut(e: React.ChangeEvent<HTMLButtonElement>) {
  //   e.preventDefault();

  //   setFeedback("");
  //   setPassword("");

  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(
  //       () => {
  //         setFeedback("Du er nå logget ut");
  //       },
  //       (error) => {
  //         setFeedback("Klarte ikke å logge deg ut, beklager det!");
  //       }
  //     );
  // }

  return (
    <StyledContainer>
      <form className="select-user__form" onSubmit={logIn}>
        <div className="smallspace">Brukernavn</div>
        <input className="smallspace" value={user} onChange={(e) => setUser(e.target.value)} />
        <div className="smallspace">Passord</div>
        <input type="password" className="smallspace" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex-row space-between">
          <input className="button" type="submit" value="Logg inn" />
        </div>
      </form>
      {feedback}
    </StyledContainer>
  );
};
