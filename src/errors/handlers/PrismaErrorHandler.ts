import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IErrorHandler } from "../../interfaces/IErrorHandler";
import { i18n } from "../../lang/i18n";

export class PrismaErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof PrismaClientKnownRequestError;
  }

  handle(error: PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const targetFields =
        (error.meta?.target as string[] | undefined)?.join(", ") ||
        i18n`errors.prisma.field_fallback`;
      return {
        statusCode: 409,
        message: i18n`errors.prisma.duplicate_entry.message(${targetFields})`,
        details: i18n`errors.prisma.duplicate_entry.details(${targetFields})`,
      };
    }

    return {
      statusCode: 500,
      message: i18n`errors.prisma.database_error`,
      details: error.message,
    };
  }
}
