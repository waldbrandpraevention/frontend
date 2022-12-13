const config = {
  environment: process.env.REACT_APP_MODE,
  isProduction: process.env.REACT_APP_MODE === "PRODUCTION",
  isDevelopment: process.env.REACT_APP_MODE === "DEVELOPMENT",

  host: process.env.REACT_APP_HOST,
  apiRoot: process.env.REACT_APP_API_ROOT,

  timeout: 10000,
};

export default config;
