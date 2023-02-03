import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { localStorageName } from "../config/config";
import { d } from "../utils/util";
import ApiClientService from "./api-client.service";

export enum AccountType {
  Benutzer = 1,
  Administrator = 2,
}

export type Organization = Readonly<{
  id: number,
  name: string,
  abbreviation: string
}>

export type Account = Readonly<{
  id: number,
  first_name: string;
  last_name: string;
  email: string;
  permission: AccountType;
  disabled: boolean;
  email_verified: boolean;
  organization: Organization;
  isUser: boolean;
  isAdmin: boolean;
}>

/**
 * Convert API response to Account type
 */
const fromApiCall = (user: any): Account => {
  return {
    ...user,
    isUser: user.permission === AccountType.Benutzer,
    isAdmin: user.permission === AccountType.Administrator,
  }
}

export const saveLocalToken = (token: string) => {
  localStorage.setItem(localStorageName, token);
}

export const loadLocalToken = (): string | null => {
  return localStorage.getItem(localStorageName);
}

export const clearLocalToken = () => {
  localStorage.removeItem(localStorageName)
}

export const hasLocalToken = (): boolean => {
  return localStorage.getItem(localStorageName) !== null
}

type AuthContextType = {
  user: Account,
  token: string | null,
  login: (token: string) => Promise<void>,
  logout: () => void
}

/* Context */
export const AuthContext = React.createContext({} as AuthContextType);

/* Hook */
export const useAuth = () => React.useContext(AuthContext);

/* Provider */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({} as Account);
  const [token, setToken] = useState(loadLocalToken());

  const [queryIsReady, setQueryIsReady] = useState(false);

  const { isFetched } = useQuery(["account"], async () => { /* Refresh user */
    return axios.get("/users/me/", { headers: { Authorization: "Bearer " + token } }).then(e => e.data);
  }, {
    onSuccess: (data) => {
      setUser(fromApiCall(data));
      d("Auth", "OK: User set!");
      setQueryIsReady(true);
    },
    onError: (err: any) => {
      /* If user token expired/not authorized, else server is probably down */
      if (err?.response?.status === 401) {
        d("Auth", "ERR: Logging out");
        logout();
        setQueryIsReady(true);
      }
    },
    retry: false,
    refetchOnMount: "always",
    refetchOnReconnect: "always",
    refetchOnWindowFocus: "always",
  })

  /**
   * Login user with given token and save it to local storage
   */
  const login = (token: string) => {
    return new Promise<void>(async (resolve, reject) => {
      const user = await axios.get("/users/me/", { headers: { Authorization: "Bearer " + token } })
        .then(e => e.data)
        .catch(() => reject());

      if (!user) return;

      setUser(fromApiCall(user));

      /* Save token */
      setToken(token);
      ApiClientService.setToken(token);
      saveLocalToken(token);

      /* redirect to requested page. example: /help -> /login -> /help */
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);

      resolve();
    });
  }

  /**
   * Logout user and remove token from local storage
   */
  const logout = () => {
    ApiClientService.deleteToken();
    clearLocalToken();
    setToken(null);
    setUser({} as Account);
  }

  const value = { user, token, login, logout };
  return <AuthContext.Provider value={value}>
    {isFetched && queryIsReady ? children : <Loading />} {/* wait for user to be fetched */}
  </AuthContext.Provider>
}

