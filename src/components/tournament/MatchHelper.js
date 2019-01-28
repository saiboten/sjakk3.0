import firebase from "../firebase/FirebaseInit";

class MatchHelper {
  static deleteListElementFromList(ref, itemid) {
    firebase
      .database()
      .ref(ref)
      .once("value", snapshot => {
        const matchListWhite = snapshot.val();
        if (matchListWhite) {
          const index = matchListWhite.indexOf(itemid);
          if (index !== -1) {
            matchListWhite.splice(index, 1);
            firebase
              .database()
              .ref(ref)
              .set(matchListWhite);
          }
        }
      });
  }
}

export default MatchHelper;
