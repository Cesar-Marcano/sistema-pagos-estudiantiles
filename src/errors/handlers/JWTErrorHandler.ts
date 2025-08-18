import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { IErrorHandler } from "../../shared/interfaces/IErrorHandler";
import { i18n } from "../../lang/i18n";

export class JWTErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return (
      error instanceof JsonWebTokenError || error instanceof TokenExpiredError
    );
  }

  handle() {
    return {
      statusCode: 401,
      message: i18n`errors.invalid_expired_token`,
    };
  }
}
