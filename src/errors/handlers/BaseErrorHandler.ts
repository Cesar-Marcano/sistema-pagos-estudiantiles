import { IErrorHandler } from "../../interfaces/IErrorHandler";
import { BaseError } from "../../utils/baseError";

export class BaseErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof BaseError;
  }

  handle(error: BaseError) {
    return {
      statusCode: error.statusCode || 500,
      message: error.message,
      details: error.data,
    };
  }
}
