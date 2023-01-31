const config = {
  environment: process.env.REACT_APP_MODE,
  isProduction: process.env.REACT_APP_MODE === "PRODUCTION",
  isDevelopment: process.env.REACT_APP_MODE === "DEVELOPMENT",

  host: process.env.REACT_APP_HOST,
  apiRoot: process.env.REACT_APP_API_ROOT,
  windData: process.env.REACT_APP_WIND_DATA,

  timeout: 10000,

  localStorageName: process.env.REACT_APP_LOCALSTORAGE_NAME ?? "wb_access_token",
  enableDebug: process.env.REACT_APP_DEBUG ?? true
};

export default config;
