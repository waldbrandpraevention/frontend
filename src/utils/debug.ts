import config from "../config/config";

export function d(service: string, msg: string) {
    if (config.enableDebug)
        console.log(`[${service}] ${msg}`);
}