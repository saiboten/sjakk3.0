import firebase from "firebase/compat/app";

class MatchHelper {
  static deleteListElementFromList(ref: any, itemid: any) {
    firebase
      .database()
      .ref(ref)
      .once("value", (snapshot) => {
        const matchListWhite = snapshot.val();
        if (matchListWhite) {
          const index = matchListWhite.indexOf(itemid);
          if (index !== -1) {
            matchListWhite.splice(index, 1);
            firebase.database().ref(ref).set(matchListWhite);
          }
        }
      });
  }
}

export default MatchHelper;
