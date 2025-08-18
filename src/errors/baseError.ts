import { CustomError } from "../shared/interfaces/CustomError";

export class BaseError extends Error implements CustomError {
  constructor(
    public readonly message: string,
    public readonly statusCode?: number,
    public readonly data?: any
  ) {
    super(message);
  }
}
