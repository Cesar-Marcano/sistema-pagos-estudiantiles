import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { IErrorHandler } from "../../interfaces/IErrorHandler";

export class JWTErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return (
      error instanceof JsonWebTokenError || error instanceof TokenExpiredError
    );
  }

  handle() {
    return {
      statusCode: 401,
      message: "Invalid or expired token",
    };
  }
}
