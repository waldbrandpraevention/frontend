import { useState, useEffect } from "react";
import { enableDebug } from "../config/config";

/**
 * Log debug message if debug is enabled
 */
export const d = (service: string, msg: string) => {
    enableDebug && console.log(`[${service}] ${msg}`);
}

/**
 * Limit text to given length and append `after` if text is longer than limit
 */
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

/**
 * Does current route match given route
 */
export const isActiveRoute = (route: string): boolean => {
    return window.location.pathname === route
}

/**
 * Debounce / rate limit. delay in ms
 */
export const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

/**
 * Random integer between min and max. inclusive both
 */
export const randomIntBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}