import React from "react";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import MatchList from "./MatchList";
import MatchRegistration from "./MatchRegistration";
import { AppState } from "../../types";
import { StyledContainer } from "../styled/StyledContainer";
import { get, getDatabase, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { app } from "../firebase/FirebaseInit";

require("./tournament.css");

interface Callback {
  white: string;
  black: string;
  date: any;
}

export const Tournament = () => {
  const params = useParams<{ id: string }>();

  const id = params.id;

  if (!id) {
    throw new Error("No param for tournament found");
  }

  const {
    users,
    matches: matchesDict,
    tournament,
    tournaments,
    loggedin,
  } = useSelector((state: AppState) => {
    const {
      users: { users },
      matches: { matches },
      tournaments: { tournaments },
      loggedin,
    } = state;
    return {
      users,
      matches,
      tournaments,
      tournament: tournaments[id],
      loggedin,
    };
  });

  function storeMatchInUserList(player: string, matchId: string) {
    const matchesRef = ref(getDatabase(app), `users/${player}/matches`);

    get(matchesRef).then((snapshot) => {
      if (snapshot.val()) {
        const matches = snapshot.val();
        matches.push(matchId);
        const userMatchRef = ref(getDatabase(app), `users/${player}/matches`);
        set(userMatchRef, matches);
      } else {
        const matches = [];
        matches.push(matchId);
        set(ref(getDatabase(app), `users/${player}/matches`), matches);
      }
    });
  }

  function storeNewMatch(newMatch: any) {
    set(ref(getDatabase(app), `matches/${newMatch.id}`), newMatch);
  }

  function addMatch(matchData: Callback) {
    const whitePlayer = users[matchData.white];
    const blackPlayer = users[matchData.black];

    const newMatch = {
      id: uuidv4(),
      white: whitePlayer.id,
      black: blackPlayer.id,
      tournament: id,
    };

    storeMatchInUserList(matchData.white, newMatch.id);
    storeMatchInUserList(matchData.black, newMatch.id);
    storeNewMatch(newMatch);

    const tournamentMatchesRef = ref(getDatabase(app), `tournaments/${id}/matches`);

    get(tournamentMatchesRef).then((snapshot) => {
      if (snapshot.val()) {
        const matchIdList = snapshot.val();
        matchIdList.push(newMatch.id);

        set(ref(getDatabase(app), `tournaments/${id}/matches`), matchIdList);
      } else {
        const matchIdList = [];
        matchIdList.push(newMatch.id);
        set(ref(getDatabase(app), `tournaments/${id}/matches`), matchIdList);
      }
    });
  }

  return (
    <StyledContainer>
      {loggedin && (
        <>
          <h1>Registrer kamp</h1>
          <MatchRegistration callback={addMatch} users={Object.values(users)} />
        </>
      )}
      <h1>{tournament.name}</h1>
      <p>Dato: {moment(tournament.date).format("DD.MM.YYYY")}</p>
      <h1>Kampliste</h1>
      <MatchList
        tournament={id}
        users={users}
        matches={matchesDict}
        matchesIDs={tournaments[id] ? tournaments[id].matches : []}
      />
    </StyledContainer>
  );
};
