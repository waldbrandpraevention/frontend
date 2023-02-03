/* date = 2023-01-10 format */
/**
 * Gets the weather API URL.
 */
export const getWeatherAPI = (center: [number, number], date: string) => {
  return `https://api.brightsky.dev/weather?lat=${center[0]}&lon=${center[1]}&date=${date}&tz=Europe/Berlin`; /* using DWD API */
};

/* cloudy-night -> night-cloudy */
/**
 * Fix CSS class names for weather icons.
 */
export const fixCssClass = (name: string): string => {
  if (!name) return "";
  let n = name;
  n = n.includes("clear-day") ? "day-sunny" : n;
  n = n.includes("-night") ? "night-" + n.substring(0, n.indexOf("-night")) : n;
  n = n.includes("-day") ? "day-" + n.substring(0, n.indexOf("-day")) : n;
  n = n.includes("-partly") ? n.replace("-partly", "") : n;
  n = n.includes("wind") ? n.replace("wind", "windy") : n;
  return n;
};
