import { i18n } from "../lang/i18n";
import { BaseError } from "../utils/baseError";

export class UnauthorizedError extends BaseError {
  constructor(message?: string) {
    super(
      message
        ? i18n`errors.unauthorized.details(${message})`
        : i18n`errors.unauthorized`,
      401
    );
  }
}
