import { createContext } from "react";

async function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  username: null,
  login: noop,
  logout: noop,
  isLogged: false
})