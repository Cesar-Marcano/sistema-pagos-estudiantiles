import { BaseError } from "../utils/baseError";

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super("Unauthorized" + (message ? `: ${message}` : ""), 401);
  }
}
