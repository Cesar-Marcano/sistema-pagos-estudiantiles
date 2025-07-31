export const englishTranslations = {
  errors: {
    unauthorized: "Unauthorized",
    unauthorized_details: "Unauthorized: {0}",
    unauthorized_rolemismatch: "Role mismatch",
    internal_server_error: "Internal Server Error",
    bad_request: "Bad Request",
    bad_request_details: "Bad Request: {0}",
    no_token_provided: "No token provided",
    invalid_expired_token: "Invalid or expired token",

    prisma: {
      duplicate_entry: {
        message: "Duplicate entry for {0}.",
        details: "The provided value for {0} already exists.",
      },
      database_error: "Database error",
      field_fallback: "field(s)",
      record_not_found: {
        message: "The requested record was not found.",
        details:
          "Could not find the record for the operation. It might have been deleted or the ID is incorrect.",
      },
      invalid_input: {
        message: "Input data validation error.",
      },
      foreign_key_constraint: {
        message: "Foreign key constraint failed.",
        details:
          "The operation cannot be performed due to a dependent relationship. Ensure related records exist or are handled correctly.",
      },
      relation_violation: {
        message: "Relation violation.",
        details:
          "The operation you are trying to perform would violate a required relation between records.",
      },
      database_connection_error: {
        message: "Database connection error.",
        details:
          "Could not establish a connection to the database. Please try again later or contact support.",
      },
    },

    zod: {
      validation_failed: "Validation Failed",
    },

    conflict: "Conflict",
    conflict_details: "Conflict: {0}",

    validation: {
      incorrect_password: "Incorrect password",
      user_not_found: "User not found",
      super_user_exists:
        "An admin user already exists. Cannot create another initial admin.",
      username: {
        min: "Username must be at least {0} characters long.",
        max: "Username cannot exceed {0} characters.",
        regex: "Username can only contain letters, numbers, and underscores.",
      },
      password: {
        min: "Password must be at least {0} characters long.",
        max: "Password cannot exceed {0} characters.",
        uppercase: "Password must contain at least one uppercase letter.",
        lowercase: "Password must contain at least one lowercase letter.",
        number: "Password must contain at least one number.",
        specialChar:
          "Password must contain at least one special character (e.g., !@#$%^&*).",
      },
      name: {
        empty: "Name cannot be empty.",
        min: "Name cannot be empty.",
        max: "Name cannot exceed {0} characters.",
      },
      fullname: {
        empty: "Full name cannot be empty.",
        max: "Full name cannot exceed {0} characters.",
      },
      document: {
        min: "Document must be at least {0} characters.",
        max: "Document cannot exceed {0} characters.",
      },
      phoneNumber: {
        min: "Phone number must be at least {0} digits.",
        max: "Phone number cannot exceed {0} digits.",
      },
      email: {
        invalid: "Invalid email format.",
      },

      birthday: {
        invalid: "Invalid birthday.",
      },
      section: {
        max: "Section cannot exceed {0} characters.",
      },
      no_data: "No data provided to perform update",
    },

    auth: {
      the_user_does_not_exist: "The user does not exist",
    },

    invalid_session: "Invalid session",
    already_logged_in: "The user is already logged-in on this device",
    not_logged_in: "The user is not logged-in on this device",
    cannot_close_self_session:
      "You can't close your active session. Please use the logout button instead.",
  },

  server: {
    listening: "Server listening on port {0}",
  },
};
