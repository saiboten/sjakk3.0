const loggedin = (state = false, action: any) => {
  switch (action.type) {
    case "LOGGED_IN":
      return true;
    default:
      return state;
  }
};

export default loggedin;
