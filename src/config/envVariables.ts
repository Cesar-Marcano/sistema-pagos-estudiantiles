export const { NODE_ENV } = process.env;

export const isDevelopment = () => NODE_ENV === "development";

export function executeInDev(callback: () => void) {
  if (isDevelopment()) {
    callback();
  }
}
