/**
 * React environment mode
 */
export const environment = process.env.REACT_APP_MODE;
/**
 * Is production mode
 */
export const isProduction = process.env.REACT_APP_MODE === "PRODUCTION";
/**
 * Is development mode
 */
export const isDevelopment = process.env.REACT_APP_MODE === "DEVELOPMENT";
/**
 * Host URL
 */
export const host = process.env.REACT_APP_HOST;
/**
 * API root URL
 */
export const apiRoot = process.env.REACT_APP_API_ROOT;
/**
 * Timeout for API requests in milliseconds
 */
export const apiTimeout = 10000;
/**
 * Wind data source. See https://github.com/waldbrandpraevention/wind-js-server
 */
export const windData = process.env.REACT_APP_WIND_DATA;
/**
 * Refetch interval in milliseconds for tiles
 */
export const refetchInterval: number = 30000;
/**
 * Local storage name for access token
 */
export const localStorageName = process.env.REACT_APP_LOCALSTORAGE_NAME ?? "wb_access_token";
/**
 * Enable debug mode
 */
export const enableDebug = process.env.REACT_APP_DEBUG ?? true;
/**
 * Status page URL
 */
export const statusPage = process.env.REACT_APP_STATUS_PAGE ?? "https://status.kiwa.tech"