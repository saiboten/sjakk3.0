const users = (
  state = {
    users: {
      loaded: false
    }
  },
  action: any
) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
        loaded: true
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default users;
