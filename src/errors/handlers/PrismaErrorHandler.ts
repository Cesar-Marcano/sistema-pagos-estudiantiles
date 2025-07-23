import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IErrorHandler } from "../../interfaces/IErrorHandler";

export class PrismaErrorHandler implements IErrorHandler {
  canHandle(error: Error): boolean {
    return error instanceof PrismaClientKnownRequestError;
  }

  handle(error: PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const targetFields =
        (error.meta?.target as string[] | undefined)?.join(", ") || "field(s)";
      return {
        statusCode: 409,
        message: `Duplicate entry for ${targetFields}.`,
        details: `The provided value for ${targetFields} already exists.`,
      };
    }

    return {
      statusCode: 500,
      message: "Database error",
      details: error.message,
    };
  }
}
