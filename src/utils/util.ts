import config from "../config/config";

export const d = (service: string, msg: string) => {
    config.enableDebug && console.log(`[${service}] ${msg}`);
}

export const limit = (text: string, limit: number, after: string = "..."): string => {
    return text.substring(0, limit) + (text.length > limit) ? after : "";
}