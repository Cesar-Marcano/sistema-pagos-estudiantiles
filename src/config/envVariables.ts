export const { NODE_ENV } = process.env;

export const REFRESH_TOKEN_EXP = "2d";

export const ACCESS_TOKEN_EXP = "15m";

export const DEFAULT_LANG = "sp";

export const isDevelopment = () => NODE_ENV === "development";
