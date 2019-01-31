const matches = (
  state = {
    matches: {
      loaded: false
    }
  },
  action: any
) => {
  switch (action.type) {
    case "SET_MATCHES":
      return {
        ...state,
        matches: action.matches,
        loaded: true
      };
    default:
      return state;
  }
};

export default matches;
