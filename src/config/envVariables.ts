export const { NODE_ENV } = process.env;

export const REFRESH_TOKEN_EXP = "2d";

export const ACCESS_TOKEN_EXP = "15m";

export const DEFAULT_LANG = "en";

export const isDevelopment = () => NODE_ENV === "development";

export function executeInDev(callback: () => void) {
  if (isDevelopment()) {
    callback();
  }
}

export function getEnv<T>(key: string, defaultVal?: T) {
  const val = process.env[key];

  return (val ? val : defaultVal) as T;
}
