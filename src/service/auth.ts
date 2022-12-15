import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react"

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

export const getAccountType = (perm: AccountPerm): AccountRole => {
    return perm === 1 ? "Benutzer" : "Administrator";
}

const setToken = (token: string) => {
    localStorage.setItem("wb_access_token", token);   /* unsicher ! */
}

const getToken = (): string | null => {
    return localStorage.getItem("wb_access_token");
}

/* hook */
const useAuth = () => {
    const [user, setUser] = useState({} as Account);

    const { } = useQuery(["acc"], () => {
        return axios.get("/users/me").then(e => e.data)
    }, {
        onSuccess: d => console.log("OK " + d),
        onError: d => console.log("ERR " + d),

    })

    return {}
}

export { useAuth };
