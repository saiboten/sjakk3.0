import { User } from "../../types";

export const setUsers = (users: any) => ({
  type: "SET_USERS",
  users
});

export const setUser = (user: User) => ({
  type: "SET_USER",
  user
});
