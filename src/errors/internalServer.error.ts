import { i18n } from "../lang/i18n";
import { BaseError } from "./baseError";

export class InternalServerError extends BaseError {
  constructor() {
    super(i18n`errors.internal_server_error`, 500);
  }
}
