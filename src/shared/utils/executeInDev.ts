import { isDevelopment } from "../../config/envVariables";

export function executeInDev(callback: () => void) {
  if (isDevelopment()) {
    callback();
  }
}
