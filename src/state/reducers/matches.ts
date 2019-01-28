const matches = (state = { matches: {} }, action: any) => {
  switch (action.type) {
    case "SET_MATCHES":
      return {
        ...state,
        matches: action.matches
      };
    default:
      return state;
  }
};

export default matches;
