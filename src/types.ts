export interface MatchDict {
  [key: string]: Match;
}

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

export interface UserDict {
  [key: string]: User;
}

export interface User {
  id: string;
  matches: string[];
  name: string;
  rating: number;
}

export interface TournamentDict {
  [key: string]: Tournament;
}

export interface Tournament {
  date: string;
  host: string;
  id: string;
  name: string;
  matches: string[];
}

export interface AppState {
  tournaments: {
    loaded: boolean;
    tournaments: TournamentDict;
  };
  matches: {
    loaded: boolean;
    matches: MatchDict;
  };
  users: {
    loaded: boolean;
    users: UserDict;
  };
}
