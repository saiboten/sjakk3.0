import firebase from "../firebase/FirebaseInit";
import { User, Match } from "../../types";
var glicko2 = require("glicko2");

var settings = {
  // tau : "Reasonable choices are between 0.3 and 1.2, though the system should
  //      be tested to decide which value results in greatest predictive accuracy."
  tau: 0.5,
  // rating : default rating
  rating: 1500,
  //rd : Default rating deviation
  //     small number = good confidence on the rating accuracy
  rd: 200,
  //vol : Default volatility (expected fluctation on the player rating)
  vol: 0.06
};

var ranking = new glicko2.Glicko2(settings);

class ScoreCalculator {
  static calculateScore(
    white: User,
    black: User,
    match: Match,
    winner: string
  ) {
    const updatedObject = Object.assign({}, match);

    updatedObject.completed = true;

    updatedObject.whiteInitialRating = white.rating;
    updatedObject.blackInitialRating = black.rating;

    const whitePlayerGlicko = ranking.makePlayer(
      white.rating,
      white.matches.length > 10 ? 100 : 300,
      0.06
    );

    const blackPlayerGlicko = ranking.makePlayer(
      black.rating,
      black.matches.length > 10 ? 100 : 300,
      0.06
    );

    const matches = [];

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

    firebase
      .database()
      .ref(`matches/${match.id}`)
      .set(updatedObject);
    firebase
      .database()
      .ref(`users/${white.id}`)
      .update({
        rating: newRatingWhite
      });

    firebase
      .database()
      .ref(`users/${black.id}`)
      .update({
        rating: newRatingBlack
      });
  }
}

export default ScoreCalculator;
