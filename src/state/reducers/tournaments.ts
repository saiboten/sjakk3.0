const matches = (
  state = {
    tournaments: {
      loaded: false
    }
  },
  action: any
) => {
  switch (action.type) {
    case "SET_TOURNAMENTS":
      return {
        ...state,
        tournaments: action.tournaments,
        loaded: true
      };
    default:
      return state;
  }
};

export default matches;
