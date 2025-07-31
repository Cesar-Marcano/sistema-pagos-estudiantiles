import { i18n } from "../lang/i18n";
import { BaseError } from "../utils/baseError";

export class ConflictError extends BaseError {
  constructor(message?: string) {
    super(
      message
        ? i18n`errors.conflict_details(${message})`
        : i18n`errors.conflict`,
      409
    );
  }
}
