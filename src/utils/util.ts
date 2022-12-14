import config from "../config/config";

export const d = (service: string, msg: string) => {
    config.enableDebug && console.log(`[${service}] ${msg}`);
}

export const limit = (text: string, limit: number, after: string = "..."): string => {
    return text.substring(0, limit) + ((text.length > limit) ? after : "");
}

/**
 * Do something once per localStorage (or sessionStorage) item lifetime
 */
export const once = (id: string, f: () => void, /* expiresMinutes: number = -1, */ sessionOnly: boolean = false) => {
    const stored = sessionOnly ? sessionStorage.getItem(id) : localStorage.getItem(id)
    if (stored !== null) return;
    f()
    const dateNow = new Date().toISOString();
    sessionOnly ? sessionStorage.setItem(id, dateNow) : localStorage.setItem(id, dateNow)
}