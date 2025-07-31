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
        details: i18n`errors.prisma.duplicate_entry_details(${targetFields})`,
      };
    }

    if (error.code === "P2025") {
      const errorMessage =
        (error.meta?.cause as string) || i18n`errors.prisma.record_not_found.message`;
      return {
        statusCode: 404,
        message: i18n`errors.prisma.record_not_found.message`,
        details: errorMessage,
      };
    }

    const inputValidationErrors = [
      "P2000",
      "P2003",
      "P2004",
      "P2005",
      "P2006",
      "P2007",
      "P2011",
      "P2012",
      "P2013",
      "P2014",
      "P2019",
      "P2020",
      "P2021",
    ];
    if (inputValidationErrors.includes(error.code)) {
      return {
        statusCode: 400,
        message: i18n`errors.prisma.invalid_input.message`,
        details: error.message,
      };
    }

    if (error.code === "P2003") {
      return {
        statusCode: 409,
        message: i18n`errors.prisma.foreign_key_constraint.message`,
        details: i18n`errors.prisma.foreign_key_constraint_details`,
      };
    }
    if (error.code === "P2014") {
      return {
        statusCode: 409,
        message: i18n`errors.prisma.relation_violation.message`,
        details: i18n`errors.prisma.relation_violation_details`,
      };
    }

    const connectionErrors = [
      "P1000",
      "P1001",
      "P1002",
      "P1003",
      "P1008",
      "P1009",
      "P1010",
    ];
    if (connectionErrors.includes(error.code)) {
      return {
        statusCode: 503,
        message: i18n`errors.prisma.database_connection_error.message`,
        details: i18n`errors.prisma.database_connection_error_details`,
      };
    }

    return {
      statusCode: 500,
      message: i18n`errors.prisma.database_error`,
      details: error.message,
    };
  }
}