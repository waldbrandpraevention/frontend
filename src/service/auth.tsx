import axios from "axios";
import React, { useState } from "react";

export enum AccountType {
    Benutzer = 1,
    Administrator = 2,
}

type AccountRole = "Benutzer" | "Administrator";
type AccountPerm = 1 | 2;

export type Account = {
    firstname: string;
    lastname: string;
    mail: string;
    permission: AccountPerm;
    role: AccountRole;
    disabled: boolean;
    mail_verified: boolean;
    organization: string;
}

export const getAccountRole = (perm: AccountPerm): AccountRole => {
    return perm === 1 ? "Benutzer" : "Administrator";
}

const setToken = (token: string) => {
    sessionStorage.setItem("wb_access_token", token); 
}

const getToken = (): string | null => {
    return sessionStorage.getItem("wb_access_token");
}

type AuthContextType = {
    user: Account,
    token: string | null,
    login: (token: string) => void,
    logout: () => void
}

/* Context */
const AuthContext = React.createContext({} as AuthContextType);

/* Hook */
export const useAuth = () => React.useContext(AuthContext);

/* Provider */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({} as Account);
    const [token, setToken] = useState(null as string | null);

    const login = async (token: string) => {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
        setToken(token);
        const user = await axios.get("/users/me/").then(e => e.data).catch(e => console.log("users get info failed " + e.toString()));
        setUser({
            firstname: user.first_name,
            lastname: user.last_name,
            mail: user.email,
            permission: user.permission ?? 1, /* API fehlt */
            mail_verified: false, /* API fehlt */
            organization: "TODO", /* API fehlt */
            disabled: false, /* API fehlt */
            role: getAccountRole(user.permission ?? 1)
        });
    }

    const logout = () => {
        delete axios.defaults.headers["Authorization"];
        setToken(null);
        setUser({
            firstname: "",
            lastname: "",
            mail: "",
            permission: 1,
            mail_verified: false,
            organization: "",
            disabled: true,
            role: getAccountRole(1)
        });
    }

    const value = { user, token, login, logout };
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}

