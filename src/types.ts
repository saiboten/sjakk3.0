import UserMatchesList from "./components/users/UserMatchesList";

export interface Match {
  white: string;
  black: string;
  whiteRatingChange: number;
  blackRatingChange: number;
  whiteInitialRating: number;
  blackInitialRating: number;
  id: string;
  completed: boolean;
  whiteWon: boolean;
  blackWon: boolean;
  remis: boolean;
}

interface MatchDict {
  [id: string]: string;
}

export interface User {
  id: string;
  matches: MatchDict;
  name: string;
  rating: number;
}

export interface Tournament {
  date: string;
  host: string;
  id: string;
  name: string;
  matches: MatchDict;
}

export interface UsersState {
  [id: string]: User;
}
