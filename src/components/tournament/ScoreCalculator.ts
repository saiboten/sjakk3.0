import firebase from "../firebase/FirebaseInit";
import { getDatabase, ref, onValue, set, update } from "firebase/database";

import { User, Match } from "../../types";
import glicko2, { Player } from "glicko2";

const settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy."
  tau: 0.5,
  // rating : default rating
  rating: 1500,
  //rd : Default rating deviation
  //     small number = good confidence on the rating accuracy
  rd: 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol: 0.06,
};

const ranking = new glicko2.Glicko2(settings);

class ScoreCalculator {
  static calculateScore(white: User, black: User, match: Match, winner: string) {
    const updatedObject = Object.assign({}, match);

    updatedObject.completed = true;

    updatedObject.whiteInitialRating = white.rating;
    updatedObject.blackInitialRating = black.rating;

    const whitePlayerGlicko = ranking.makePlayer(white.rating, white.matches.length > 10 ? 100 : 300, 0.06);

    const blackPlayerGlicko = ranking.makePlayer(black.rating, black.matches.length > 10 ? 100 : 300, 0.06);

    const matches: any = [];

    if (winner === "white") {
      updatedObject.whiteWon = true;
      matches.push([whitePlayerGlicko, blackPlayerGlicko, 1]);
    } else if (winner === "black") {
      updatedObject.blackWon = true;
      matches.push([whitePlayerGlicko, blackPlayerGlicko, 0]);
    } else {
      updatedObject.remis = true;
      matches.push([whitePlayerGlicko, blackPlayerGlicko, 0.5]);
    }

    ranking.updateRatings(matches);

    const newRatingWhite = Math.floor(whitePlayerGlicko.getRating());
    const newRatingBlack = Math.floor(blackPlayerGlicko.getRating());

    updatedObject.blackRatingChange = newRatingBlack - black.rating;
    updatedObject.whiteRatingChange = newRatingWhite - white.rating;

    const matchesRef = ref(getDatabase(firebase), `matches/${match.id}`);

    set(matchesRef, updatedObject);

    const usersRef = ref(getDatabase(firebase), `users/${white.id}`);

    update(usersRef, {
      rating: newRatingWhite,
    });

    const otherUserRef = ref(getDatabase(firebase), `users/${black.id}`);

    update(otherUserRef, {
      rating: newRatingBlack,
    });
  }
}

export default ScoreCalculator;
