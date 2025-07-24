import { i18n } from "../lang/i18n";
import { BaseError } from "../utils/baseError";

export class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(
      message
        ? i18n`errors.bad_request.details(${message})`
        : i18n`errors.bad_request`,
      401
    );
  }
}
