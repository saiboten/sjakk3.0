const matches = (state = { tournaments: {} }, action: any) => {
  switch (action.type) {
    case "SET_TOURNAMENTS":
      return {
        ...state,
        tournaments: action.tournaments
      };
    default:
      return state;
  }
};

export default matches;
